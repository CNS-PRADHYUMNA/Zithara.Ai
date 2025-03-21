import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMapMarkerAlt, 
  faMoneyBillWave, 
  faCalendar,
  faArrowLeft,
  faBuilding,
  faTag
} from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'

// Job Interface
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    tags: string[];
    postedDate: string;

}

// JobDetails Page Component
const JobDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // Generate job listings (same function as in HomePage)
    const generateJobListings = (count: number): Job[] => {
        const companies = [
            'Tech Innovations Inc.', 'Cloud Solutions LLC', 'Data Dynamics', 
            'Web Wizards', 'AI Frontier', 'Quantum Systems', 'Cyber Secure',
            'Global Networks', 'Innovative Platforms', 'Future Tech'
        ]
    
        const jobTitles = [
            'Senior React Developer', 'Backend Engineer', 'Full Stack Developer',
            'DevOps Specialist', 'Machine Learning Engineer', 'Cloud Architect',
            'Frontend Developer', 'Data Scientist', 'Security Analyst', 'Product Manager'
        ]
    
        return Array.from({ length: count }, (_, index) => ({
            id: `job-${index + 1}`,
            title: jobTitles[index % jobTitles.length],
            company: companies[index % companies.length],
            location: ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX', 'Seattle, WA'][index % 5],
            salary: `$${(90 + index * 5) * 1000} - $${(120 + index * 5) * 1000}`,
            description: 'We are looking for a talented professional to join our innovative team and drive technological excellence.',
            tags: ['Full-time', 'Tech', 'Innovative'],
            postedDate: `${Math.floor(index / 3) + 1} days ago`,
            
        }))
    }

    // Find the specific job based on ID
    const jobListings = generateJobListings(30)
    const job = jobListings.find(j => j.id === id)

    // Handle back navigation
    const handleGoBack = () => {
        navigate('/')
    }

    // If no job found, return not found page
    if (!job) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-2xl text-gray-600">Job Not Found</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile-Friendly Header */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <button 
                        onClick={handleGoBack}
                        className="text-gray-600 hover:text-blue-600"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 truncate">Job Details</h1>
                    <div className="w-8"></div> {/* Spacer for layout */}
                </div>
            </header>

            {/* Job Details Container */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                {/* Hero Section with Background */}
                <div className="relative mb-8">
                    <div className="h-48 md:h-100 overflow-hidden rounded-xl">
                        <img 
                            src="https://i0.wp.com/plopdo.com/wp-content/uploads/2021/10/graphicdesign.png?zoom=2&resize=1210%2C642&ssl=1" 
                            alt="Job Details Background" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Job Header Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-full mr-4 shadow-lg">
                                
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-white">{job.title}</h2>
                                <p className="text-sm md:text-base text-gray-200">{job.company}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                            <span className="font-semibold">Location</span>
                        </div>
                        <p className="text-gray-700">{job.location}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-green-500" />
                            <span className="font-semibold">Salary</span>
                        </div>
                        <p className="text-gray-700">{job.salary}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-purple-500" />
                            <span className="font-semibold">Posted</span>
                        </div>
                        <p className="text-gray-700">{job.postedDate}</p>
                    </div>
                </div>

                {/* Job Description */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                        Job Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Job Tags */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faTag} className="mr-2 text-green-500" />
                        Job Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
                    >
                        Apply Now
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors w-full md:w-auto"
                    >
                        Save Job
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}

export default JobDetailsPage