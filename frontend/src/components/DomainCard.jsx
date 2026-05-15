import React from 'react'
import { ArrowRight } from 'lucide-react'

const DomainCard = ({ domain, index, onClick }) => {
  const Icon = domain.icon

  return (
    <div
      onClick={onClick}
      className="card p-5 sm:p-8 cursor-pointer group hover:scale-105 active:scale-[0.99] transform transition-all duration-300"
    >
      <div className={`bg-gradient-to-br ${domain.color} rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white group-hover:shadow-lg transition-shadow`}>
        <Icon className="text-4xl sm:text-5xl" />
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{domain.title}</h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 min-h-0 sm:min-h-[60px]">{domain.description}</p>
      
      <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm sm:text-base font-semibold group-hover:gap-3 transition-all">
        <span>Get Started</span>
        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  )
}

export default DomainCard
