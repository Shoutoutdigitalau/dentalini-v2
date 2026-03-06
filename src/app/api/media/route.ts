import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import Media from "@/models/Media";

async function getUniqueFilename(uploadsDir: string, originalName: string): Promise<string> {
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  
  let filename = originalName;
  let counter = 1;
  
  while (true) {
    const filepath = path.join(uploadsDir, filename);
    try {
      await access(filepath);
      // File exists, try next number
      filename = `${nameWithoutExt} ${counter}${ext}`;
      counter++;
    } catch {
      // File doesn't exist, use this name
      break;
    }
  }
  
  return filename;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Get unique filename
    const filename = await getUniqueFilename(uploadsDir, file.name);

    // Save file
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Save to database
    const url = `/uploads/${filename}`;
    const media = await Media.create({
      filename,
      originalName: file.name,
      url,
      size: file.size,
      mimeType: file.type,
      alt: ""
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const media = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
