'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Code2, Heart, Target, Lightbulb, Coffee, Rocket, Star, Award, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [, setActiveCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const personalInfo = [
    {
      title: "Passion Saya",
      description: "Saya sangat passionate dalam menciptakan solusi digital yang inovatif dan user-friendly. Setiap proyek adalah kesempatan untuk belajar dan berkembang.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-red-400 via-pink-500 to-purple-600",
      color: "text-red-500"
    },
    {
      title: "Misi Saya", 
      description: "Membantu bisnis dan individu mewujudkan visi digital mereka melalui teknologi web modern dan desain yang menarik.",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
      color: "text-blue-500"
    },
    {
      title: "Filosofi Kerja",
      description: "Saya percaya bahwa detail kecil membuat perbedaan besar. Setiap line code dan pixel design memiliki tujuan yang jelas.",
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      color: "text-yellow-500"
    },
    {
      title: "Motivasi Harian",
      description: "Kopi di pagi hari, code di siang hari, dan kepuasan melihat project selesai di malam hari. Itulah rutinitas yang saya nikmati.",
      icon: <Coffee className="w-8 h-8" />,
      gradient: "from-amber-400 via-yellow-500 to-orange-600",
      color: "text-amber-600"
    }
  ];

  const achievements = [
    { icon: <Award className="w-6 h-6" />, label: "50+ Proyek Selesai", value: "50+" },
    { icon: <Users className="w-6 h-6" />, label: "25+ Klien Puas", value: "25+" },
    { icon: <Clock className="w-6 h-6" />, label: "2+ Tahun Pengalaman", value: "2+" },
    { icon: <Star className="w-6 h-6" />, label: "100% Dedikasi", value: "100%" }
  ];

  const technologies = [
    { name: "Laravel", color: "bg-red-500", icon: "🔥" },
    { name: "Next.js", color: "bg-black", icon: "⚡" },
    { name: "React", color: "bg-blue-500", icon: "⚛️" },
    { name: "Tailwind CSS", color: "bg-cyan-500", icon: "🎨" },
    { name: "Bootstrap", color: "bg-purple-500", icon: "📱" },
    { name: "MySQL", color: "bg-orange-500", icon: "🗄️" },
    { name: "PHP", color: "bg-indigo-500", icon: "🐘" },
    { name: "Figma", color: "bg-pink-500", icon: "🎯" }
  ];

  const journey = [
    {
      year: "2022",
      title: "Memulai Perjalanan",
      description: "Mulai belajar web development dengan HTML, CSS, dan JavaScript dasar.",
      color: "bg-blue-500"
    },
    {
      year: "2023", 
      title: "Eksplorasi Framework",
      description: "Mendalami Laravel untuk backend dan mulai belajar React untuk frontend.",
      color: "bg-green-500"
    },
    {
      year: "2024",
      title: "Professional Growth",
      description: "Mengerjakan proyek-proyek real dan mengembangkan skill UI/UX design.",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Interactive cursor follower */}
      <div 
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float-particle"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float-particle animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-float-particle animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-700 rounded-full px-4 py-2 mb-8">
            <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">Tentang Saya</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Mengenal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-x">
              Adryan
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Seorang Full Stack Developer dan UI/UX Designer yang selalu antusias dalam menciptakan 
            pengalaman digital yang luar biasa dan bermakna.
          </p>

          {/* Profile Image with Enhanced Animation */}
          <div className="relative w-48 h-48 mx-auto mt-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-spin-reverse opacity-50"></div>
            
            <div className="relative w-full h-full p-3">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                <Image
                  src="/4.jpg"
                  alt="Adryan Profile"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info Cards */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Lebih Dekat Dengan Saya
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-fade-in-up border border-slate-200 dark:border-slate-700 overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${info.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                
                <div className={`${info.color} mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  {info.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {info.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  {info.description}
                </p>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </section>

        

        {/* Achievements */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-100/50 to-blue-100/50 dark:from-slate-800/50 dark:to-blue-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                Pencapaian Saya
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center group transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {achievement.value}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Teknologi yang Saya Kuasai
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 animate-fade-in-up border border-slate-200 dark:border-slate-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${tech.color} rounded-full animate-pulse`}></div>
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-bold mb-6">
                Mari Berkolaborasi!
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Saya selalu excited untuk mengerjakan proyek-proyek baru dan bertemu dengan orang-orang kreatif. 
                Mari kita ciptakan sesuatu yang luar biasa bersama!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Star className="w-5 h-5" />
                  Lihat Portfolio
                </Link>
                <a
                  href="https://wa.me/089667884100"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5" />
                  Hubungi Saya
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.8; }
          75% { transform: translateY(-25px) translateX(15px); opacity: 0.9; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-float-particle { animation: float-particle 6s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
        
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}