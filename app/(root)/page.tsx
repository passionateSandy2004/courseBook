"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Home = () => {
  const modules = [
    {
      title: "Module 1: Making Drone",
      videos: [
        {
          url: "/Screen Recording 2024-10-08 181428.mp4",
          subtitle: "Setting up the components",
          description: "Learn how to set up the components for building a drone. This module covers the basics of assembling the parts and ensuring everything is connected properly.",
        },
        {
          url: "/Screen Recording 2024-10-24 163914.mp4",
          subtitle: "Assembling the Frame",
          description: "This video covers the steps to assemble the drone frame securely and efficiently.",
        },
      ],
    },
    {
      title: "Module 2: Advanced Drone Techniques",
      videos: [
        {
          url: "/Screen Recording 2024-10-24 163914.mp4",
          subtitle: "Enhancing Drone Performance",
          description: "Explore advanced techniques to enhance your drone's performance. This module includes tips on optimizing flight stability and increasing battery efficiency.",
        },
      ],
    },
  ];

  const [currentModule, setCurrentModule] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsNextEnabled(false); // Reset "Next" button until video finishes
  }, [currentVideo, currentModule]);

  const handleVideoEnd = () => {
    setIsNextEnabled(true);
  };

  const handleNext = () => {
    if (currentVideo < modules[currentModule].videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    } else if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentVideo(0);
    }
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", padding: "10px", maxWidth: "1000px", margin: "0 auto", backgroundColor: "#f4f4f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#333", fontSize: "2.2em", margin: "0" }}>Business Video Modules</h1>
        <p style={{ color: "#555", fontSize: "1.1em", margin: "5px 0" }}>Explore our professional video content</p>
      </header>
      <Tabs defaultValue={`module-${currentModule}`} onValueChange={(value) => {
        const moduleIndex = parseInt(value.split('-')[1], 10);
        setCurrentModule(moduleIndex);
        setCurrentVideo(0);
      }} style={{ textAlign: "center" }}>
        <TabsList style={{ justifyContent: "center", marginBottom: "5px", display: "flex", gap: "10px" }}>
          {modules.map((module, index) => (
            <TabsTrigger
              key={index}
              value={`module-${index}`}
              style={{
                padding: "8px 20px",
                borderRadius: "5px",
                backgroundColor: currentModule === index ? "#007bff" : "#e0e0e0",
                color: currentModule === index ? "#fff" : "#333",
                border: "2px solid",
                borderColor: currentModule === index ? "#007bff" : "transparent",
                transition: "background-color 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
            >
              {module.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <TabsContent value={`module-${currentModule}`}>
            <h2 style={{ color: "#444", fontSize: "1.6em", marginBottom: "10px" }}>{modules[currentModule].title}</h2>
            <h4 style={{ color: "#666", fontSize: "1.2em", marginBottom: "10px" }}>{modules[currentModule].videos[currentVideo].subtitle}</h4>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <video
                key={modules[currentModule].videos[currentVideo].url}
                controls
                onEnded={handleVideoEnd}
                style={{
                  width: "85%",
                  height: "auto",
                  maxHeight: "600px",
                  borderRadius: "10px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                }}
                controlsList="nodownload"
              >
                <source src={modules[currentModule].videos[currentVideo].url} type="video/mp4" />
              </video>
            </div>

            <div className="pb-5">
              <p style={{ color: "#666", fontSize: "1em" }}>
                {modules[currentModule].videos[currentVideo].description}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Button
                onClick={() => setCurrentVideo((prev) => Math.max(0, prev - 1))}
                disabled={currentVideo === 0}
                style={{ backgroundColor: "#007bff", color: "#fff", borderRadius: "5px", padding: "8px 20px", border: "none", cursor: "pointer" }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isNextEnabled}
                style={{ backgroundColor: "#28a745", color: "#fff", borderRadius: "5px", padding: "8px 20px", border: "none", cursor: "pointer" }}
              >
                {currentVideo < modules[currentModule].videos.length - 1 ? "Next" : "Next Module"}
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Home;
