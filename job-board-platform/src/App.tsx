
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/Home'
import JobDetailsPage from './Components/JobDetails'
import JobPostingForm from './Components/JobPostingForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/jobPosting" element={<JobPostingForm />} />
      </Routes>
    </Router>
  )
}

export default App