import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    technologies: [String],
    image: String,
    githubLink: String,
    liveLink: String,
    screenshots: [String],
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
