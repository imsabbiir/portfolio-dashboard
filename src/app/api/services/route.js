// app/api/services/route.js
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Service from "@/models/services";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find();
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Error fetching services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    console.log("Received Data:", data);

    const { title, details } = data;

    if (!title || !Array.isArray(details)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    const newService = await Service.create({
      title: title.trim(),
      details: details.map((d) => d.trim()),
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Error to post New Service", error: error.message },
      { status: 500 }
    );
  }
}
