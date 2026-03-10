import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();
  
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    let settings = await Settings.findOne();
    console.log('body', body)
    console.log('before', settings)
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings.openingHours = body.openingHours;
      settings.contactInfo = {
        phone: body.contactInfo.phone,
        email: body.contactInfo.email,
        address: body.contactInfo.address,
        mapUrl: body.contactInfo.mapUrl
      };
      settings.markModified('contactInfo');
      await settings.save();
    }
    
    console.log('after', settings)
    
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
