import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import Media from "@/models/Media";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await req.json();
    
    const media = await Media.findByIdAndUpdate(
      id,
      { filename: data.filename, alt: data.alt },
      { new: true }
    );
    
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }
    
    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }
    
    // Delete file from filesystem
    const filepath = path.join(process.cwd(), "public", media.url);
    try {
      await unlink(filepath);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
    
    // Delete from database
    await Media.findByIdAndDelete(id);
    
    return NextResponse.json({ message: "Media deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
