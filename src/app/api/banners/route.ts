import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Banner from "@/models/Banner";

export async function GET() {
  try {
    await dbConnect();
    const banners = await Banner.find({}).sort({ order: 1 });
    return NextResponse.json({ banners });
  } catch {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const banner = await Banner.create(data);
    return NextResponse.json({ banner }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
