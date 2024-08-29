'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSession } from '../lib/db'

export default function Session() {
  const router = useRouter()
  const [distance, setDistance] = useState('')
  const [targetPace, setTargetPace] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // For now, we'll use a hardcoded user ID. In a real app, you'd get this from authentication.
      const userId = 1 // Assuming the first user has ID 1
      const sessionId = await createSession(userId, parseFloat(distance), targetPace, comment)
      router.push(`/result/${sessionId}`)
    } catch (error) {
      console.error('Error saving session:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Create Running Session</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="distance" className="block mb-2">Distance (km):</label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="targetPace" className="block mb-2">Target Pace (min/km):</label>
          <input
            type="text"
            id="targetPace"
            value={targetPace}
            onChange={(e) => setTargetPace(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="e.g. 5:30"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">Comment (optional):</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Generate Motivational Audio
        </button>
      </form>
    </div>
  )
}