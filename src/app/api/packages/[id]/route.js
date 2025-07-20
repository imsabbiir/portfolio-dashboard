import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Packages from "@/models/packages";

// UPDATE (PUT) handler
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await request.json();

  try {
    const updatedPackage = await Packages.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedPackage) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPackage, { status: 200 });
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
