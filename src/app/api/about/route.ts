import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AboutSection from "@/models/AboutSection";

export async function GET() {
  try {
    await dbConnect();
    const about = await AboutSection.findOne();
    return NextResponse.json({ about });
  } catch {
    return NextResponse.json({ error: "Failed to fetch about section" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    let about = await AboutSection.findOne();
    if (!about) {
      about = await AboutSection.create(data);
    } else {
      Object.assign(about, data);
      await about.save();
    }
    return NextResponse.json({ about });
  } catch {
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
  }
}
