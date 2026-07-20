import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaArrowRight,
  FaStar,
  FaPython,
  FaJava,
  FaJs,
  FaReact,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiGo,
  SiRust,
} from "react-icons/si";
import {
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineCode,
} from "react-icons/hi";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const textOptions = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Dynamic Programming",
    "Graph Theory",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { icon: <FaPython />, color: "text-yellow-400", position: "top-32 left-[10%]", delay: "0s", size: "text-3xl" },
    { icon: <FaJava />, color: "text-red-400", position: "top-48 right-[12%]", delay: "1s", size: "text-3xl" },
    { icon: <SiCplusplus />, color: "text-blue-400", position: "bottom-40 left-[8%]", delay: "2s", size: "text-3xl" },
    { icon: <FaJs />, color: "text-yellow-300", position: "top-60 left-[20%]", delay: "0.5s", size: "text-2xl" },
    { icon: <SiTypescript />, color: "text-blue-500", position: "bottom-52 right-[15%]", delay: "1.5s", size: "text-2xl" },
    { icon: <SiGo />, color: "text-cyan-400", position: "top-40 left-[35%]", delay: "3s", size: "text-2xl" },
    { icon: <FaReact />, color: "text-cyan-300", position: "bottom-36 right-[30%]", delay: "2.5s", size: "text-3xl" },
    { icon: <SiRust />, color: "text-orange-400", position: "top-72 right-[8%]", delay: "0.8s", size: "text-2xl" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.08),transparent_50%)]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Language Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} ${item.color} ${item.size} opacity-20 animate-float hidden lg:block`}
          style={{ animationDelay: item.delay }}
        >
          {item.icon}
        </div>
      ))}

      

       

       

       

       

       
  
    </section>
  );
};

export default Hero;