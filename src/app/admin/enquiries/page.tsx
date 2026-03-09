'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const res = await fetch("/api/enquiries");
    const data = await res.json();
    setEnquiries(data.enquiries || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    fetchEnquiries();
  };

  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: currentStatus === 'new' ? 'read' : 'new' })
    });
    fetchEnquiries();
  };

  const filtered = enquiries.filter(e => 
    e.firstName.toLowerCase().includes(search.toLowerCase()) ||
    e.lastName.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    (e.phone && e.phone.includes(search)) ||
    (e.subject && e.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const total = filtered.length;
  const pages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">Enquiries</h1>
            <div className="text-sm text-gray-600">
              {enquiries.filter(e => e.status === 'new').length} new
            </div>
          </div>

          <div className="mb-4">
            <Input 
              placeholder="Search by name, email, phone, or subject..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="max-w-md"
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((enquiry) => (
                  <TableRow key={enquiry._id}>
                    <TableCell>
                      <button
                        onClick={() => handleMarkAsRead(enquiry._id, enquiry.status)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          enquiry.status === 'new' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {enquiry.status === 'new' ? 'New' : 'Read'}
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {enquiry.firstName} {enquiry.lastName}
                    </TableCell>
                    <TableCell>
                      <a href={`mailto:${enquiry.email}`} className="text-[#0091BA] hover:underline">
                        {enquiry.email}
                      </a>
                    </TableCell>
                    <TableCell>{enquiry.phone || '-'}</TableCell>
                    <TableCell>{enquiry.subject || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(enquiry.createdAt), 'PP')}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(enquiry._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-600">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {start + 1}-{Math.min(start + perPage, total)} of {total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center px-3 text-sm">
                  Page {page} of {pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(pages, p + 1))}
                  disabled={page === pages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
