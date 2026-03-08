  'use client';

  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import AdminSidebar from "@/components/admin/AdminSidebar";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Switch } from "@/components/ui/switch";
  import { ArrowLeft, Image as ImageIcon } from "lucide-react";
  import Link from "next/link";
  import MediaPickerModal from "@/components/admin/MediaPickerModal";
  import RichTextEditor from "@/components/admin/RichTextEditor";

  export default function EditTeamPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [description, setDescription] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      role: "",
      image: "",
      order: 0,
      isPrincipal: false
    });

    useEffect(() => {
      fetchMember();
    }, []);

    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/team/${params.id}`);
        const data = await res.json();
        if (data.member) {
          setFormData({
            name: data.member.name || "",
            role: data.member.role || "",
            image: data.member.image || "",
            order: data.member.order || 0,
            isPrincipal: data.member.isPrincipal || false
          });
          setDescription(data.member.description || "");
        }
      } catch (error) {
        console.error("Failed to fetch team member:", error);
      } finally {
        setFetching(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await fetch(`/api/team/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, description })
        });

        if (res.ok) {
          router.push("/admin/team");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (fetching) {
      return (
        <div className="flex h-screen bg-gray-100">
          <AdminSidebar />
          <main className="flex-1 overflow-auto flex items-center justify-center">
            <div className="text-slate-600">Loading team member...</div>
          </main>
        </div>
      );
    }

    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="mb-8">
              <Link href="/admin/team">
                <Button variant="ghost" className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Team
                </Button>
              </Link>
              <div className="mb-2">
                <h1 className="text-4xl font-serif font-bold text-slate-900">Edit Team Member</h1>
              </div>
              <p className="text-slate-600">Update team member information</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
              <div className="p-8 flex flex-col gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Name
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Dr. John Smith"
                    className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-semibold text-slate-700">
                    Role
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Dental Assistant"
                    className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                    required
                  />
                </div>

                <div className="border-t border-slate-200"></div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <RichTextEditor 
                    content={description} 
                    onChange={setDescription}
                    onImageClick={() => setShowMediaPicker(true)}
                  />
                </div>

                <div className="border-t border-slate-200"></div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-semibold text-slate-700">
                    Profile Image
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  
                  {formData.image ? (
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-slate-200 mx-auto">
                      <img
                        src={formData.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMediaPicker(true)}
                      className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-[#0091BA] hover:bg-slate-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <span className="text-sm text-slate-600">Click to select image</span>
                      </div>
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order" className="text-sm font-semibold text-slate-700">
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="h-12 text-base border-slate-300 focus:border-[#0091BA] focus:ring-[#0091BA]/20"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="isPrincipal"
                    checked={formData.isPrincipal}
                    onChange={(e) => setFormData({ ...formData, isPrincipal: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isPrincipal" className="text-sm font-semibold text-slate-700 cursor-pointer">
                    Principal Dentist (Featured Display)
                  </Label>
                </div>
              </div>

              <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex items-center justify-between">
                <Link href="/admin/team">
                  <Button type="button" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-200">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#0E2F80] to-[#0091BA] hover:from-[#0E2F80]/90 hover:to-[#0091BA]/90 text-white px-8 h-11 font-semibold shadow-lg shadow-[#0091BA]/20" 
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Team Member"}
                </Button>
              </div>

              
            </form>
          </div>
        </main>
  
        <MediaPickerModal
          isOpen={showMediaPicker}
          onClose={() => setShowMediaPicker(false)}
          onSelect={(url) => setFormData({ ...formData, image: url })}
        />
      </div>
    );
  }
