import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export async function GET() {
  try {
    await dbConnect();
    const team = await Team.find({}).sort({ order: 1 });
    return NextResponse.json({ team });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const member = await Team.create(data);
    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
