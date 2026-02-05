import { NextResponse } from 'next/server';

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result?.reviews) {
      return NextResponse.json({ reviews: data.result.reviews });
    }
    
    return NextResponse.json({ reviews: [] });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}
