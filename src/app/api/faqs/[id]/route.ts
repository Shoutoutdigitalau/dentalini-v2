import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FAQ from "@/models/FAQ";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    return NextResponse.json({ faq });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
