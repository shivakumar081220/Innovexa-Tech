import mongoose from 'mongoose'

const userRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDomain: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'MERN Stack',
        'Mobile Apps',
        'IoT',
        'AI/ML',
        'Cybersecurity',
        'Python Projects',
        'Java Projects',
        'Project Reports',
      ],
    },
    projectType: {
      type: String,
      required: true,
      enum: ['Mini', 'Major', 'Research', 'Startup'],
    },
    technologiesRequired: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    detailedRequirements: {
      type: String,
      required: true,
    },
    needProjectReport: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'No',
    },
    preferredCommunication: {
      type: String,
      enum: ['Email', 'WhatsApp', 'Phone'],
      default: 'Email',
    },
    referenceFiles: [String],
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

export default mongoose.model('UserRequest', userRequestSchema)
