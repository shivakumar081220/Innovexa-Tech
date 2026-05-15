import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import UserRequest from './models/UserRequest.js'

dotenv.config()

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with payment integration',
    domain: 'MERN Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/example/ecommerce',
    liveLink: 'https://ecommerce-demo.com',
  },
  {
    title: 'AI Chatbot',
    description: 'Intelligent chatbot using machine learning and NLP',
    domain: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    githubLink: 'https://github.com/example/chatbot',
  },
  {
    title: 'IoT Smart Home',
    description: 'Smart home automation system with real-time monitoring',
    domain: 'IoT',
    technologies: ['Arduino', 'Python', 'React', 'Firebase'],
    githubLink: 'https://github.com/example/smarthome',
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with advanced features',
    domain: 'Mobile Apps',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/example/banking',
  },
  {
    title: 'Cybersecurity Audit Tool',
    description: 'Comprehensive security audit and vulnerability scanner',
    domain: 'Cybersecurity',
    technologies: ['Python', 'Flask', 'PostgreSQL'],
    githubLink: 'https://github.com/example/security',
  },
  {
    title: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with advanced visualizations',
    domain: 'Web Development',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    liveLink: 'https://analytics-demo.com',
  },
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Project.deleteMany({})
    await UserRequest.deleteMany({})

    // Insert sample projects
    await Project.insertMany(sampleProjects)
    console.log('Sample projects inserted')

    // Insert sample user request
    const sampleUserRequest = new UserRequest({
      fullName: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+91 9876543210',
      collegeName: 'IIT Delhi',
      projectTitle: 'Social Media Platform',
      projectDomain: 'MERN Stack',
      projectType: 'Major',
      technologiesRequired: 'React, Node.js, MongoDB, Socket.io',
      deadline: new Date('2024-06-30'),
      budget: 150000,
      detailedRequirements: 'Build a comprehensive social media platform with real-time notifications',
      needProjectReport: 'Yes',
      preferredCommunication: 'Email',
      status: 'In Progress',
    })
    await sampleUserRequest.save()
    console.log('Sample user request inserted')

    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
