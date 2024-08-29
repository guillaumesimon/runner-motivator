'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [coachingStyle, setCoachingStyle] = useState('fun')
  const [language, setLanguage] = useState('english')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save profile data (you can use local storage or a backend API)
    localStorage.setItem('runnerProfile', JSON.stringify({ name, coachingStyle, language }))
    router.push('/session')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Runner Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coachingStyle" className="block mb-2">Coaching Style:</label>
          <select
            id="coachingStyle"
            value={coachingStyle}
            onChange={(e) => setCoachingStyle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="fun">Fun</option>
            <option value="pushy">Pushy</option>
            <option value="harsh">Harsh</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block mb-2">Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save Profile
        </button>
      </form>
    </div>
  )
}