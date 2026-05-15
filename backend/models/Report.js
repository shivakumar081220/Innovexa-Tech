import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ['APA', 'IEEE', 'MLA', 'Chicago'],
      required: true,
    },
    description: String,
    file: String,
  },
  { timestamps: true }
)

export default mongoose.model('Report', reportSchema)
