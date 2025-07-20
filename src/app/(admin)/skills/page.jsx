"use client";
import React, { useEffect, useState } from "react";
import ActionButtons from "@/Components/ActionButtons";

const initialSkillState = { languages: [], technologies: [], others: [] };

export default function Page() {
  const [skills, setSkills] = useState(initialSkillState);
  const [modes, setModes] = useState({
    languages: "default",
    technologies: "default",
    others: "default",
  });

  const [newItems, setNewItems] = useState({
    languages: { title: "", percent: "" },
    technologies: { title: "", percent: "" },
    others: "",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        const data = await res.json();
        setSkills(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const updateSkills = async (updated) => {
    try {
      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Update failed");
      setSkills(updated);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleSave = (type) => {
    const updated = { ...skills };
    if (type === "others") {
      updated.others.push(newItems.others);
      setNewItems({ ...newItems, others: "" });
    } else {
      updated[type].push(newItems[type]);
      setNewItems({ ...newItems, [type]: { title: "", percent: "" } });
    }
    updateSkills(updated);
    setModes({ ...modes, [type]: "default" });
  };

  const handleUpdate = (type) => {
    updateSkills(skills);
    setModes({ ...modes, [type]: "default" });
  };

  const renderList = (type) => (
    <div className="py-5 px-10 rounded flex flex-col justify-center gradientBg relative">
      <ActionButtons
        mode={modes[type]}
        onSave={() => handleSave(type)}
        onCancel={() => setModes({ ...modes, [type]: "default" })}
        onAdd={() => setModes({ ...modes, [type]: "add" })}
        onEdit={() => setModes({ ...modes, [type]: "edit" })}
        onUpdate={() => handleUpdate(type)}
      />

      {modes[type] === "add" && (
        <div className="mb-3 flex gap-3">
          {type !== "others" ? (
            <>
              <input
                value={newItems[type].title}
                onChange={(e) =>
                  setNewItems({
                    ...newItems,
                    [type]: { ...newItems[type], title: e.target.value },
                  })
                }
                placeholder="Title"
                className="input"
              />
              <input
                value={newItems[type].percent}
                onChange={(e) =>
                  setNewItems({
                    ...newItems,
                    [type]: { ...newItems[type], percent: e.target.value },
                  })
                }
                placeholder="Percent"
                className="input w-24" // or w-20, w-16 based on your layout
              />
            </>
          ) : (
            <input
              value={newItems.others}
              onChange={(e) =>
                setNewItems({ ...newItems, others: e.target.value })
              }
              placeholder="New Skill"
              className="input w-full"
            />
          )}
        </div>
      )}

      {skills[type].map((item, idx) => (
        <li className="flex justify-between" key={idx}>
          {modes[type] === "edit" ? (
            type !== "others" ? (
              <>
                <input
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...skills[type]];
                    updated[idx].title = e.target.value;
                    setSkills({ ...skills, [type]: updated });
                  }}
                  className="input"
                />
                <input
                  value={item.percent}
                  onChange={(e) => {
                    const updated = [...skills[type]];
                    updated[idx].percent = e.target.value;
                    setSkills({ ...skills, [type]: updated });
                  }}
                  className="input w-24"
                />
              </>
            ) : (
              <input
                value={item}
                onChange={(e) => {
                  const updated = [...skills.others];
                  updated[idx] = e.target.value;
                  setSkills({ ...skills, others: updated });
                }}
                className="input"
              />
            )
          ) : (
            <>
              <span className="titleText capitalize">
                {type !== "others" ? `${item.title}:` : item}
              </span>
              {type !== "others" && (
                <span className="subTitleText">{item.percent}</span>
              )}
            </>
          )}
        </li>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-7">
      <div className="grid gap-7">
        {renderList("languages")}
        {renderList("technologies")}
      </div>
      <div className="grid">{renderList("others")}</div>
    </div>
  );
}
