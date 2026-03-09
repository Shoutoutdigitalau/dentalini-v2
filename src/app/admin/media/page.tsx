'use client';

import { useState, useRef, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Search, Grid3x3, List, Copy, Edit2, Trash2, Check, X } from "lucide-react";

interface MediaFile {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  alt: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [editForm, setEditForm] = useState({ filename: '', alt: '' });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setFiles(data.media || []);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    setLoading(true);
    
    for (const file of Array.from(uploadedFiles)) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          body: formData
        });
        
        if (res.ok) {
          await fetchMedia();
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (file: MediaFile) => {
    setEditingFile(file);
    setEditForm({ filename: file.originalName, alt: file.alt });
  };

  const handleSaveEdit = async () => {
    if (!editingFile) return;
    
    try {
      const res = await fetch(`/api/media/${editingFile._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (res.ok) {
        await fetchMedia();
        setEditingFile(null);
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        await fetchMedia();
        if (selectedFile?._id === id) setSelectedFile(null);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredFiles = files.filter(f => 
    f.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Media Library</h1>
              <p className="text-slate-600">{files.length} files</p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-gradient-to-r from-[#0E2F80] to-[#0091BA] hover:from-[#0E2F80]/90 hover:to-[#0091BA]/90 text-white px-6 h-11 font-semibold shadow-lg shadow-[#0091BA]/20"
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Uploading...' : 'Upload Files'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200/60 p-4 mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Files Display */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200/60 p-6">
            {filteredFiles.length === 0 ? (
              <div className="text-center py-20">
                <Upload className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">No files uploaded yet</p>
                <p className="text-sm text-slate-400">Click "Upload Files" to get started</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file._id}
                    className="group relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200 hover:border-[#0091BA] cursor-pointer transition-all"
                    onClick={() => setSelectedFile(file)}
                  >
                    <img
                      src={file.url}
                      alt={file.alt || file.filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(file.url, file._id);
                        }}
                      >
                        {copiedId === file._id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(file);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-red-500/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs truncate">{file.originalName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file._id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 hover:border-[#0091BA] hover:bg-slate-50 cursor-pointer transition-all"
                    onClick={() => setSelectedFile(file)}
                  >
                    <img
                      src={file.url}
                      alt={file.alt || file.filename}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{file.originalName}</p>
                      <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(file.url, file._id);
                        }}
                      >
                        {copiedId === file._id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(file);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* File Details Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedFile.url}
                  alt={selectedFile.alt || selectedFile.filename}
                  className="w-full rounded-lg border border-slate-200"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Filename</Label>
                  <p className="text-slate-900 mt-1">{selectedFile.originalName}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Alt Text</Label>
                  <p className="text-slate-900 mt-1">{selectedFile.alt || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-slate-700">File Size</Label>
                  <p className="text-slate-900 mt-1">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-slate-700">URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={selectedFile.url} readOnly className="font-mono text-xs" />
                    <Button
                      size="sm"
                      onClick={() => handleCopyUrl(selectedFile.url, selectedFile._id)}
                    >
                      {copiedId === selectedFile._id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(selectedFile)}
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(selectedFile._id);
                      setSelectedFile(null);
                    }}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit File</DialogTitle>
          </DialogHeader>
          {editingFile && (
            <div className="space-y-4">
              <div>
                <img
                  src={editingFile.url}
                  alt={editingFile.alt || editingFile.filename}
                  className="w-full rounded-lg border border-slate-200 mb-4"
                />
              </div>
              <div>
                <Label htmlFor="edit-filename">Filename</Label>
                <Input
                  id="edit-filename"
                  value={editForm.filename}
                  onChange={(e) => setEditForm({ ...editForm, filename: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-alt">Alt Text</Label>
                <Input
                  id="edit-alt"
                  value={editForm.alt}
                  onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="ghost" onClick={() => setEditingFile(null)} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
