"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Languages/Libraries",
    id: "languages/libraries",
    content: (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Python
        </div>
        <div className="flex items-center">
          <i className="fab fa-java text-red-500 text-2xl"></i> Java
        </div>
        <div className="flex items-center">
          <i className="fas fa-database text-green-500 text-2xl"></i> PostgreSQL
        </div>
        <div className="flex items-center">
          <i className="fab fa-js text-yellow-500 text-2xl"></i> Javascript
        </div>
        <div className="flex items-center">
          <i className="fas fa-code text-blue-600 text-2xl"></i> HTML
        </div>
        <div className="flex items-center">
          <i className="fas fa-paint-brush text-purple-500 text-2xl"></i> CSS
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Pandas
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Numpy
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Scikit-learn
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Matplotlib
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> TensorFlow
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> PyTorch
        </div>
      </div>
    ),
  },
  {
    title: "Databases / Frameworks",
    id: "databases/frameworks",
    content: (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Firebase
        </div>
        <div className="flex items-center">
          <i className="fab fa-java text-red-500 text-2xl"></i> MongoDB
        </div>
        <div className="flex items-center">
          <i className="fas fa-database text-green-500 text-2xl"></i> PostgreSQL
        </div>
        <div className="flex items-center">
          <i className="fab fa-js text-yellow-500 text-2xl"></i> Next.js
        </div>
        <div className="flex items-center">
          <i className="fas fa-code text-blue-600 text-2xl"></i> Node.js
        </div>
        <div className="flex items-center">
          <i className="fas fa-paint-brush text-purple-500 text-2xl"></i> Flask
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> React
        </div>
        <div className="flex items-center">
          <i className="fab fa-python text-blue-500 text-2xl"></i> Rest API
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Bachelor Degree in Artificial Intelligence / Computer Science</li>
        <li>Purdue University</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("languages/libraries");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.jpeg" width={400} height={400} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          Hi, I am an Artificial Intelligence / Computer Science major attending Purdue University.
          I have indulged myself in various computer science projects for the past 5 years, 
          dealing with back-end development and Machine Learning using Java and Python. 
          I wish to challenge my abilities and innovate in this era of technology.
          I also enjoy exploring my creative side through photography, capturing moments that 
          inspire me, and staying active with sports like basketball and skiing to keep both my
           mind and body energized.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("languages/libraries")}
              active={tab === "languages/libraries"}
            >
              {" "}
              Languages & Libraries{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("databases/frameworks")}
              active={tab === "databases/frameworks"}
            >
              {" "}
              Databases & Frameworks{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
