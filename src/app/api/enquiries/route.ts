import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ enquiries });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const enquiry = await Enquiry.create(data);
    return NextResponse.json({ enquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}
