'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import Skills from "@/components/skill";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const technologies = [
    { name: "Next.js", color: "blue", icon: "⚡" },
    { name: "React", color: "green", icon: "⚛️" },
    { name: "TypeScript", color: "purple", icon: "📘" },
    { name: "Tailwind CSS", color: "cyan", icon: "🎨" }
  ];

  const features = [
    {
      title: "Our Mission",
      description: "To create exceptional web experiences using cutting-edge technologies and innovative solutions.",
      icon: "🎯",
      gradient: "from-blue-400 to-purple-600"
    },
    {
      title: "Our Vision", 
      description: "To be at the forefront of web development, delivering high-quality applications that make a difference.",
      icon: "🚀",
      gradient: "from-green-400 to-blue-600"
    }
  ];

  return (
    <>
      <Hero />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className={`flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Animated Header */}
        <div className="flex items-center gap-4 group">
          <div className="relative">
            <Image
              className="dark:invert transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={25}
              priority
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
            About Us
          </h1>
        </div>

        {/* Animated Introduction */}
        <div className="text-center sm:text-left space-y-6">
          <p className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Welcome to our Next.js application! This is a modern web application built with the latest technologies and best practices.
          </p>
          
          {/* Enhanced Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative p-6 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all duration-500 delay-${(index + 1) * 200} transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${activeCard === index ? 'shadow-2xl' : 'hover:shadow-xl'}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl animate-bounce">{feature.icon}</span>
                    <h2 className="text-xl font-semibold">{feature.title}</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r ${feature.gradient} opacity-0 hover:opacity-100 transition-opacity duration-300`} style={{
                  background: `linear-gradient(white, white) padding-box, linear-gradient(45deg, transparent, transparent) border-box`,
                  backgroundClip: 'padding-box, border-box'
                }}></div>
              </div>
            ))}
          </div>

          {/* Enhanced Technologies Section */}
          <div className={`mt-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
              Technologies We Use
              <span className="inline-block ml-2 animate-spin">⚙️</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 bg-${tech.color}-100 dark:bg-${tech.color}-900 text-${tech.color}-800 dark:text-${tech.color}-200 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <span className="mr-1">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className={`flex gap-4 items-center flex-col sm:flex-row mt-8 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            className="group rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto hover:scale-105 hover:shadow-lg transform"
            href="/"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </a>
          <a
            className="group rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto hover:scale-105 hover:shadow-lg transform relative overflow-hidden"
            href="/contact"
          >
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </a>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className={`row-start-3 flex gap-[24px] flex-wrap items-center justify-center transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <a
          className="group flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-300 hover:scale-105"
          href="/"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Home icon"
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="transition-colors duration-300 group-hover:text-blue-600">Home</span>
        </a>
        <a
          className="group flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-300 hover:scale-105"
          href="/contact"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Contact icon"
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="transition-colors duration-300 group-hover:text-purple-600">Contact</span>
        </a>
      </footer>

      {/* Floating Animation Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-ping"></div>
      <div className="fixed bottom-20 right-10 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="fixed top-1/2 right-20 w-12 h-12 bg-green-500 rounded-full opacity-10 animate-bounce"></div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
    <Skills />
    </>
  );
}