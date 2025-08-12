'use client';

import { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: string;
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React/Next.js", level: 90, icon: "⚛️", color: "blue" },
        // { name: "TypeScript", level: 85, icon: "📘", color: "blue" },
        { name: "Tailwind CSS", level: 88, icon: "🎨", color: "cyan" },
        { name: "JavaScript", level: 92, icon: "⚡", color: "yellow" },
        { name: "HTML/CSS", level: 95, icon: "🌐", color: "orange" },
        { name: "Vue.js", level: 75, icon: "💚", color: "green" }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        // { name: "Node.js", level: 85, icon: "🟢", color: "green" },
        // { name: "Express.js", level: 80, icon: "🚀", color: "gray" },
        { name: "Python", level: 50, icon: "🐍", color: "green" },
        { name: "PHP (Laravel)", level: 80, icon: "🐍", color: "blue" },
        { name: "Mysql", level: 82, icon: "🐘", color: "gray" },
        // { name: "MongoDB", level: 75, icon: "🍃", color: "green" },
        { name: "REST APIs", level: 50, icon: "🔗", color: "purple" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git/GitHub", level: 70, icon: "📚", color: "gray" },
        // { name: "Docker", level: 70, icon: "🐳", color: "blue" },
        // { name: "AWS", level: 65, icon: "☁️", color: "orange" },
        { name: "Figma", level: 80, icon: "🎨", color: "purple" },
        { name: "VS Code", level: 95, icon: "💻", color: "blue" },
        { name: "Postman", level: 55, icon: "📮", color: "orange" }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      cyan: 'from-cyan-500 to-cyan-600',
      yellow: 'from-yellow-500 to-yellow-600',
      orange: 'from-orange-500 to-orange-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colorMap[color] || 'from-blue-500 to-blue-600';
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Skill Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getColorClasses(skill.color)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
                    </div>
                  </div>
                </div>

                {/* Skill Level Badge */}
                <div className="mt-4 flex justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.level >= 90 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : skill.level >= 80
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : skill.level >= 70
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning 📚
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technology evolves rapidly, and Im committed to continuous learning. 
              I regularly update my skills and explore new technologies to stay current with industry trends.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
}