import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Developerdetails from "@/models/developerdetails";

export async function GET(request) {
  try {
    await dbConnect();
    const bio = await Developerdetails.findOne();
    return NextResponse.json(bio);
  } catch (error) {
    console.error("Error fetching developer details:", error);
    return NextResponse.json(
      { message: "Fetching developer details error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Check if a developer record exists
    let existing = await Developerdetails.findOne();
    if (!existing) {
      return NextResponse.json(
        { message: "Developer not found. Cannot update." },
        { status: 404 }
      );
    }

    // Perform the update
    const updated = await Developerdetails.findOneAndUpdate(
      {}, // match any document
      data,
      { new: true } // return the updated document
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Error updating developer", error: error.message },
      { status: 500 }
    );
  }
}
