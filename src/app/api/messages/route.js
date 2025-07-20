import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Messages from "@/models/messages";

export async function GET(request) {
  try {
    await dbConnect();
    const messages = await Messages.find().sort({ createdAt: -1 }); // Sorted newest first
    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { message: "There was a problem fetching messages data." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, service, package: selectedPackage } = body;

    // Validation for all required fields
    if (!name || !email || !service || !selectedPackage) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newMessage = await Messages.create({
      name,
      email,
      service,
      package: selectedPackage,
      read: false,
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { message: "Failed to save form data." },
      { status: 500 }
    );
  }
}
