import React from 'react'
import { Star } from 'lucide-react'

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div className="card p-8">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{testimonial.text}"
      </p>

      <div className="border-t dark:border-gray-700 pt-4">
        <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.college}</p>
      </div>
    </div>
  )
}

export default TestimonialCard
