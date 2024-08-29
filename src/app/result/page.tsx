'use client'

import React, { useState, useEffect } from 'react'
import { getSessionDetails } from '@/lib/db'

const Result: React.FC = () => {
  const [coachingSpeech, setCoachingSpeech] = useState('')

  useEffect(() => {
    const generateCoachingSpeech = async () => {
      if (typeof window !== 'undefined') {
        const sessionData = JSON.parse(localStorage.getItem('currentSession') || '{}')
        
        // Simulated API call
        const speech = `
          [0:00] Great job setting up your ${sessionData.distance}km run!
          [0:30] Remember, we're aiming for a pace of ${sessionData.targetPace} min/km.
          [2:00] Keep up the good work! You're doing great.
          [5:00] Halfway there! Maintain your pace.
          [8:00] Final push! You've got this!
          [9:30] Excellent work! Cool down and stretch.
        `
        
        setCoachingSpeech(speech)
      }
    }

    generateCoachingSpeech()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Your Motivational Speech</h1>
      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg">
        <pre className="whitespace-pre-wrap">{coachingSpeech}</pre>
      </div>
    </div>
  )
}

export default async function Result({ params }: { params: { id: string } }) {
  const sessionId = parseInt(params.id, 10)
  const sessionDetails = await getSessionDetails(sessionId)

  if (!sessionDetails) {
    return <div>Session not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Session Details</h1>
      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg">
        <p>Distance: {sessionDetails.distance} km</p>
        <p>Target Pace: {sessionDetails.target_pace} min/km</p>
        <p>Comment: {sessionDetails.comment}</p>
        <h2 className="text-2xl font-bold mt-4 mb-2">Audio Files:</h2>
        <ul>
          {sessionDetails.audio_files.map((file: string, index: number) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}