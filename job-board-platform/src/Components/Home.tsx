import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faFilter, 
  faMapMarkerAlt, 
  faMoneyBillWave, 
  faHeart, 
  faClock,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

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
  
// Generate a large number of job listings
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
      logo: `/company-logos/logo${(index % 5) + 1}.png`
    }))
}

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [jobListings] = useState<Job[]>(generateJobListings(30))
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobListings)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
    // Search and Filter Function
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.toLowerCase()
      setSearchTerm(term)
  
      const filtered = jobListings.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
      )
  
      setFilteredJobs(filtered)
    }
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header with Responsive Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <img 
                src="https://zithara.ai/_next/image?url=%2Flogo.png&w=640&q=75" 
                alt="Zithara Logo" 
                width={120} 
                height={40} 
                className="mr-4"
              />
              {/* Desktop Navigation */}
              <nav className="space-x-4 hidden md:block">
                <a href="#" className="text-gray-800 hover:text-blue-600">Jobs</a>
                <a href="#" className="text-gray-800 hover:text-blue-600">Companies</a>
                <a href="#" className="text-gray-800 hover:text-blue-600">Career Advice</a>
              </nav>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
            <Link to={`/jobPosting`}>
                    <button 
                      
                        className="text-white  font-semibold bg-blue-600 p-2 rounded-md cursor-pointer"
                    >
                        Post a Job
                    </button>
                    </Link>
              <button className="text-gray-800 hover:text-blue-600">
                Login
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-800 focus:outline-none"
              >
                <FontAwesomeIcon 
                  icon={isMobileMenuOpen ? faTimes : faBars} 
                  className="text-2xl" 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-40 md:hidden"
            >
              <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                {/* Close Button */}
                <button 
                  onClick={closeMobileMenu}
                  className="absolute top-6 right-6 text-gray-800 focus:outline-none"
                >
                  <FontAwesomeIcon 
                    icon={faTimes} 
                    className="text-3xl" 
                  />
                </button>

                <a 
                  href="#" 
                  onClick={closeMobileMenu} 
                  className="text-2xl text-gray-800 hover:text-blue-600"
                >
                  Jobs
                </a>
                <a 
                  href="#" 
                  onClick={closeMobileMenu} 
                  className="text-2xl text-gray-800 hover:text-blue-600"
                >
                  Companies
                </a>
                <a 
                  href="#" 
                  onClick={closeMobileMenu} 
                  className="text-2xl text-gray-800 hover:text-blue-600"
                >
                  Career Advice
                </a>
                <button 
                  onClick={closeMobileMenu} 
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                  Post a Job
                </button>
                <button 
                  onClick={closeMobileMenu} 
                  className="text-gray-800 hover:text-blue-600"
                >
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[70%] md:pr-10 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Find Your Dream Job
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-600"
          >
            Discover exciting opportunities and take the next step in your career
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <input 
              type="text"
              placeholder="Search jobs by title, company, or location"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 pl-10 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full">
              Search
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-col md:flex-row items-center"
          >
            <span className="mr-4 text-gray-600 mb-2 md:mb-0">Popular Searches:</span>
            <div className="flex space-x-2 flex-wrap justify-center md:justify-start">
              {['React', 'Frontend', 'Backend', 'Full Stack'].map(tag => (
                <motion.span 
                  key={tag} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer m-1"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full md:w-[30%] mt-8 md:mt-0"
        >
          <img 
            src="/i1.jpg" 
            alt="Job Search Illustration" 
            className="w-full rounded-lg shadow-xl object-cover"
          />
        </motion.div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Latest Job Openings
          </h2>
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Advanced Filters
          </button>
        </div>

        {/* Job Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredJobs.map(job => (
            <motion.div 
              key={job.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-end items-start mb-4">
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </motion.button>
                </div>
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.company}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {job.postedDate}
                  </span>
                  <Link to={`/job/${job.id}`}>
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        View Details
                    </motion.button>
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(page => (
              <motion.button 
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-md ${
                  page === 1 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {page}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage