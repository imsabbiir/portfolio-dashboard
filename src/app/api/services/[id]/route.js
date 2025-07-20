import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Services from "@/models/services";

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  try {
    const updatedService = await Services.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(updatedService, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error updating service" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const deletedService = await Services.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Error deleting service", error: error.message },
      { status: 500 }
    );
  }
}