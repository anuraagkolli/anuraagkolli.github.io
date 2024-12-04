"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Next.js Portfolio Website",
    description: "A modern and visually appealing portfolio built with Next.js, React, and Tailwind CSS, designed to showcase projects, technical skills, and contact information. The website features interactive animations powered by Framer Motion and CSS transitions, ensuring a seamless and engaging user experience. Fully responsive and optimized for cross-browser compatibility using React hooks and JavaScript.",
    image: "/images/projects/1.png",
    tag: ["All", "SWE"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Shanti Mental Health AI",
    description: "A mobile application that tracks emotions and mental health using advanced NLP and sentiment analysis algorithms. The app features secure data storage with MongoDB Atlas and Docker for consistent deployment. Scalable back-end operations are supported by AWS Lambda, ensuring reliability and seamless performance for user growth.",
    image: "/images/projects/2.png",
    tag: ["All", "ML", "SWE"],
    gitUrl: "https://github.com/anuraagkolli/Shanti-Mental-Health-AI",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Explorer AI Chatbot",
    description: "A full-stack application that generates personalized travel itineraries using ShellGPT API, accommodating user preferences, destinations, and budgets. The front end, crafted with React, Tailwind CSS, and HTML, offers an interactive and user-friendly interface. The Flask-based back end is integrated with Supabase for smooth data handling and secure storage.",
    image: "/images/projects/3.png",
    tag: ["All", "SWE", "ML"],
    gitUrl: "https://github.com/anuraagkolli/Explorer.AI",
    previewUrl: "https://www.youtube.com/watch?v=hPo2X4tWXLE",
  },
  {
    id: 4,
    title: "Messaging App",
    description: "A Java-based messaging application with a robust server capable of handling multiple clients through multi-threading and concurrency. The intuitive GUI, built with the Swing library, enhances accessibility and user experience.",
    image: "/images/projects/4.png",
    tag: ["All", "SWE"],
    gitUrl: "https://github.com/anuraagkolli/SocialMediaProject",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "FIFA Players Analysis",
    description: "",
    image: "/images/projects/5.png",
    tag: ["All", "ML"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="SWE"
          isSelected={tag === "SWE"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="ML"
          isSelected={tag === "ML"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
