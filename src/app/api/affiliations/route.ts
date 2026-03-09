import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Affiliation from "@/models/Affiliation";

export async function GET() {
  try {
    await dbConnect();
    const affiliations = await Affiliation.find({}).sort({ order: 1 });
    return NextResponse.json({ affiliations });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch affiliations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const affiliation = await Affiliation.create(data);
    return NextResponse.json({ affiliation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create affiliation" }, { status: 500 });
  }
}
