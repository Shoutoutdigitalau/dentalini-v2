import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const service = await Service.findById(params.id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const service = await Service.findByIdAndUpdate(params.id, data, { new: true });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const service = await Service.findByIdAndDelete(params.id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
