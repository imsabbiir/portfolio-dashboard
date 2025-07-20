import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Skills from "@/models/skills";

// GET all skills
export async function GET() {
  try {
    await dbConnect();
    const skills = await Skills.find();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching skills", error: error.message },
      { status: 500 }
    );
  }
}

// PUT update skills
export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const existing = await Skills.findOne();
    if (!existing) {
      return NextResponse.json({ message: "Skills not found" }, { status: 404 });
    }

    const updated = await Skills.findByIdAndUpdate(existing._id, data, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { message: "Error updating skills", error: error.message },
      { status: 500 }
    );
  }
}
