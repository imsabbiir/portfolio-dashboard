import dbConnect from "@/lib/mongoose";
import Package from "@/models/packages";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const packages = await Package.find();
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json(
      { message: "fetching Package data faild" },
      { status: 500 }
    );
  }
}
