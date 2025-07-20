import dbConnect from "@/lib/mongoose";
import Project from "@/models/projects";
import { NextResponse } from "next/server";

export async function GET(request) {
    try{
        await dbConnect()
        const projects = await Project.find();
        return NextResponse.json(projects);
    }catch(error){
        return NextResponse.json(
            {message: "fail to get project data"},
            {status: 500}
        )
    }
}

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();
    console.log("Received Data:", data);

    const newProject = new Project(data);
    await newProject.save();

    return NextResponse.json(newProject, { status: 201 });
  } catch (e) {
    console.error("❌ Error saving project:", e.message);
    console.error("📄 Full stack trace:", e.stack);
    return NextResponse.json(
      { message: "Error creating project", error: e.message },
      { status: 500 }
    );
  }
}