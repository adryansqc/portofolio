'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, Star, Calendar, Code2, Sparkles } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    title: 'Web-News',
    description: 'A digital news platform focused on business and economic information in Jambi. Built with Laravel and Bootstrap, featuring content management system, news categorization, and article management.',
    image: '/jambisnis.png',
    link: 'https://github.com/yourusername/ecommerce',
    demo: 'https://jambisnis.com',
    tech: ['Laravel', 'Bootstrap', 'Tailwind Css', 'Mysql'],
    category: 'Full Stack',
    featured: true,
    year: '2025',
    status: 'Live'
  },
  {
    title: 'Company Profile Website',
    description: 'A professional company profile website showcasing business services, company history, team members, and achievements with an elegant and modern design.',
    image: '/pkpjbc.png', 
    link: 'https://github.com/yourusername/taskmanager',
    demo: 'https://pkpjbc.com',
    tech: ['Laravel', 'Bootstrap', 'Tailwind Css', 'Mysql'],
    category: 'Full Stack',
    featured: false,
    year: '2025',
    status: 'Live'
  },
  {
    title: 'PPDB Website',
    description: 'A comprehensive online student admission system for SMA Tri Sukses Boarding School Jambi, featuring digital registration forms, document uploads, and real-time application status tracking.',
    image: '/ppdb.png',
    link: 'https://github.com/yourusername/weather',
    demo: 'https://smappdb.smatrisuksesbsjambi.sch.id/',
    tech: ['Laravel', 'Bootstrap', 'Mysql'],
    category: 'Full Stack',
    featured: true,
    year: '2024',
    status: 'Live'
  },
  {
    title: 'Digital Library Platform',
    description: 'An interactive digital library platform designed to promote reading literacy. Features include book cataloging, reading progress tracking, book reviews and ratings, and a community discussion forum for readers.',
    image: '/kunangan.png',
    link: 'https://github.com/yourusername/weather',
    demo: 'https://literasikunangan.id',
    tech: ['Laravel', 'Bootstrap', 'Mysql'],
    category: 'Full Stack',
    featured: false,
    year: '2023',
    status: 'Live'
  }
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend']
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Portfolio Showcase</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            A curated collection of projects showcasing my expertise in web development, 
            from dynamic full-stack applications to elegant user interfaces.
          </p>
          
          {/* Enhanced Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-700/50 hover:border-gray-600/50 hover:-translate-y-3 hover:rotate-1"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              {/* Status Badge */}
              {/* <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {project.status}
                </div>
              </div> */}

              {/* Enhanced Image Container */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Floating Action Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {project.demo && (
                    <Link 
                      href={project.demo}
                      className="bg-blue-500/20 backdrop-blur-md p-3 rounded-full hover:bg-blue-500/30 transition-all duration-200 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-400" />
                    </Link>
                  )}
                </div>

                {/* Year Badge */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Enhanced Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                      style={{
                        animationDelay: `${techIndex * 100}ms`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Enhanced Links */}
                <div className="flex gap-4 pt-6 border-t border-gray-700/50">
                  {project.demo && (
                    <Link 
                      href={project.demo}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </Link>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Lihat lebih banyak tentang project saya
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Kunjungi github saya untuk melihat lebih banyak project yang saya buat
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  Get In Touch
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 bg-gray-800/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  )
}