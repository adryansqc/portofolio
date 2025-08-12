import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Web-News',
    description: 'A digital news platform focused on business and economic information in Jambi. Built with Laravel and Bootstrap, featuring content management system, news categorization, and article management.',
    image: '/jambisnis.png',
    link: 'https://github.com/yourusername/ecommerce',
    demo: 'https://jambisnis.com',
    tech: ['Laravel', 'Bootstrap', 'Tailwind Css', 'Mysql'],
    category: 'Full Stack'
  },
  {
    title: 'Company Profile Website',
    description: 'A professional company profile website showcasing business services, company history, team members, and achievements with an elegant and modern design.',
    image: '/pkpjbc.png', 
    link: 'https://github.com/yourusername/taskmanager',
    demo: 'https://pkpjbc.com',
    tech: ['Laravel', 'Bootstrap', 'Tailwind Css', 'Mysql'],
    category: 'Full Stack'
  },
  {
    title: 'PPDB Website',
    description: 'A comprehensive online student admission system for SMA Tri Sukses Boarding School Jambi, featuring digital registration forms, document uploads, and real-time application status tracking.',
    image: '/ppdb.png',
    link: 'https://github.com/yourusername/weather',
    demo: 'https://smappdb.smatrisuksesbsjambi.sch.id/',
    tech: ['Laravel', 'Bootstrap', 'Mysql'],
    category: 'Full Stack'
  },
  {
    title: 'Digital Library Platform',
    description: 'An interactive digital library platform designed to promote reading literacy. Features include book cataloging, reading progress tracking, book reviews and ratings, and a community discussion forum for readers.',
    image: '/kunangan.png',
    link: 'https://github.com/yourusername/weather',
    demo: 'https://literasikunangan.id',
    tech: ['Laravel', 'Bootstrap', 'Mysql'],
    category: 'Full Stack'
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, 
            from full-stack applications to interactive dashboards.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-gray-600 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-900/90 backdrop-blur-sm text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    href={project.link}
                    className="bg-gray-900/90 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 text-gray-200" />
                  </Link>
                  {project.demo && (
                    <Link 
                      href={project.demo}
                      className="bg-gray-900/90 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-200" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 text-blue-400 text-sm font-medium px-3 py-1 rounded-full border border-blue-900/50 hover:from-blue-900/50 hover:to-indigo-900/50 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  {/* <Link 
                    href={project.link}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Link> */}
                  {project.demo && (
                    <Link 
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Interested in working together or want to see more of my work?
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get In Touch
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}