import React from 'react'
import { FaCode, FaMobileAlt, FaRobot, FaShieldAlt, FaPython, FaJava, FaFileAlt, FaChartLine, FaCheckCircle, FaGlobe, FaHtml5, FaCss3Alt, FaMicrochip } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiJavascript } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DomainCard from '../../components/DomainCard'

const Home = () => {
  const navigate = useNavigate()

  const domains = [
    {
      icon: SiReact,
      title: 'Web Development',
      description: 'Modern, responsive web applications using latest technologies',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: SiMongodb,
      title: 'MERN Stack',
      description: 'Full-stack JavaScript applications with MongoDB, Express, React & Node.js',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaRobot,
      title: 'IoT Projects',
      description: 'Internet of Things solutions with embedded systems and microcontrollers',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FaRobot,
      title: 'AI/ML',
      description: 'Machine Learning models and AI-powered intelligent systems',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FaShieldAlt,
      title: 'Cybersecurity',
      description: 'Security solutions, penetration testing, and threat analysis',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: FaPython,
      title: 'Python Projects',
      description: 'Automation, data analysis, and backend services in Python',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaJava,
      title: 'Java Projects',
      description: 'Enterprise applications, desktop software, and backend services',
      color: 'from-red-600 to-orange-500',
    },
    {
      icon: FaFileAlt,
      title: 'Project Reports',
      description: 'Professional documentation in APA, IEEE, and academic formats',
      color: 'from-teal-500 to-blue-500',
    },
  ]

  const technologies = [
    { icon: FaGlobe, name: 'Web' },
    { icon: FaHtml5, name: 'HTML' },
    { icon: FaCss3Alt, name: 'CSS' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiReact, name: 'React' },
    { icon: SiNodedotjs, name: 'Node.js' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiExpress, name: 'Express' },
    { icon: FaPython, name: 'Python' },
    { icon: FaMicrochip, name: 'IoT' },
  ]

  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '200+', label: 'Happy Clients' },
    { value: '15+', label: 'Technologies' },
    { value: '99%', label: 'Satisfaction Rate' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl leading-tight font-bold mb-5 sm:mb-6 text-gray-900">
              Professional Project Development for Your Academic & Career Goals
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
              We specialize in creating high-quality MERN stack, mobile, IoT, AI/ML, and cybersecurity projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/project-form')}
                className="btn-primary w-full sm:w-auto text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Our Specialized Domains</h2>
            <p className="text-base sm:text-xl text-gray-600">Choose your project domain</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {domains.map((domain, idx) => (
              <DomainCard
                key={idx}
                domain={domain}
                index={idx}
                onClick={() => navigate(`/project-form/${domain.title.replace(/\s+/g, '-')}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Technologies We Master</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {technologies.map((tech, idx) => (
              <div key={idx} className="card p-5 sm:p-8 text-center">
                <tech.icon className="text-4xl sm:text-5xl mx-auto mb-3 sm:mb-4 text-blue-600" />
                <h3 className="font-semibold text-base sm:text-lg">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8">Connect with our team today</p>
          <button
            onClick={() => navigate('/project-form')}
            className="bg-white text-blue-600 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-50"
          >
            Submit Project Details
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
