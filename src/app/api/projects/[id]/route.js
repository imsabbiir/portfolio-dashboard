import dbConnect from "@/lib/mongoose";
import Project from "@/models/projects";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching project" },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updatedData = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Error updating project", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting project", error }, { status: 500 });
  }
}