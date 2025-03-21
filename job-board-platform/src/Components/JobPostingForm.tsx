import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPaperPlane, 
  faBuilding, 
  faMapMarkerAlt, 
  faMoneyBillWave,
  faTag
} from '@fortawesome/free-solid-svg-icons'

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name required"),
  location: z.string().min(2, "Location required"),
  salary: z.string().min(1, "Salary required"),
  description: z.string().optional()
})

type JobFormData = z.infer<typeof jobSchema>

const JobPostingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema)
  })

  const onSubmit = (data: JobFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Add your job posting logic here
      console.log(data)
      reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Hero Image Section */}
          <div className="hidden md:block relative">
            <img 
              src="/i2.jpg" 
              alt="Job Posting Illustration" 
              className="absolute inset-0 w-full h-full object-cover"
            />
      
          </div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-10 space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Job Posting Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Job Title Input */}
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faTag} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" 
                />
                <input 
                  {...register('title')}
                  placeholder="Job Title"
                  className="w-full p-3 pl-10 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              {/* Company Input */}
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faBuilding} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" 
                />
                <input 
                  {...register('company')}
                  placeholder="Company Name"
                  className="w-full p-3 pl-10 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
              </div>

              {/* Location Input */}
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" 
                />
                <input 
                  {...register('location')}
                  placeholder="Job Location"
                  className="w-full p-3 pl-10 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
              </div>

              {/* Salary Input */}
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faMoneyBillWave} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" 
                />
                <input 
                  {...register('salary')}
                  placeholder="Salary Range"
                  className="w-full p-3 pl-10 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
              </div>

              {/* Optional Description */}
              <div>
                <textarea 
                  {...register('description')}
                  placeholder="Job Description (Optional)"
                  className="w-full p-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center ${
                  isSubmitting 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <div className="animate-pulse">Posting Job...</div>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Post Job
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default JobPostingForm