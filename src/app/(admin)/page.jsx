"use client";
import CategoryProjectsBarChart from "@/Components/CategroyProjectsBarChart";
import CategoryProjectsPieCharts from "@/Components/CategoryProjectsPieCharts";
import StatCard from "@/Components/StatCard";
import { Award, Clock, Package, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

function page() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const yearsOfExperience = new Date().getFullYear() - 2021;

  const categoryCount = projects.reduce((acc, project) => {
    const type = project.projectType;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  console.log("category wise project count from dashboard page",categoryCount)
  return (
    <div>
      {loading ? (
        "Loading...."
      ) : (
        <>
          <div className='grid md:grid-cols-4 gap-5'>
            <StatCard
              name={"Total Projects"}
              icon={Package}
              value={projects.length}
            />
            <StatCard
              name={"Years Of Experience"}
              icon={Clock}
              value={`${yearsOfExperience}+`}
            />
            <StatCard name={"Happy Customers"} icon={Users} value={"6+"} />
            <StatCard name={"Honors and Awards"} icon={Award} value={"00"} />
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <CategoryProjectsPieCharts categoryCount={categoryCount}/>
            <CategoryProjectsBarChart categoryCount={categoryCount}/>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
