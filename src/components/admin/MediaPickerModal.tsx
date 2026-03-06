"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Search, Check } from "lucide-react";

interface MediaFile {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  alt: string;
  size: number;
  mimeType: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setFiles(data.media || []);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.media) {
        setFiles([data.media, ...files]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
      setSelectedUrl(null);
    }
  };

  const filteredFiles = files.filter(
    (file) =>
      file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button asChild disabled={uploading}>
              <label className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
            {filteredFiles.map((file) => (
              <div
                key={file._id}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedUrl === file.url
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedUrl(file.url)}
              >
                <img
                  src={file.url}
                  alt={file.alt || file.originalName}
                  className="w-full h-full object-cover"
                />
                {selectedUrl === file.url && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No images found. Upload one to get started.
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSelect} disabled={!selectedUrl}>
              Insert Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
