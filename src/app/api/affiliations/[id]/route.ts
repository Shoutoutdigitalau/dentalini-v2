import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Affiliation from "@/models/Affiliation";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const affiliation = await Affiliation.findById(id);
    return NextResponse.json({ affiliation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch affiliation" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const data = await req.json();
    const affiliation = await Affiliation.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ affiliation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update affiliation" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    await Affiliation.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete affiliation" }, { status: 500 });
  }
}
