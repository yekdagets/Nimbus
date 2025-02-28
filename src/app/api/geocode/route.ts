import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude parameters are required" },
      { status: 400 }
    );
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return NextResponse.json({
        city: data[0].name,
        country: data[0].country,
      });
    } else {
      return NextResponse.json(
        { error: "No location found for the given coordinates" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch location data",
      },
      { status: 500 }
    );
  }
}
