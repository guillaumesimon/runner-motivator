'use client'

import { useState, useEffect } from 'react'

export default function Result() {
  const [coachingSpeech, setCoachingSpeech] = useState('')

  useEffect(() => {
    // In a real application, you would call your backend API here
    // to generate the coaching speech using Claude 3.5 Sonnet
    // For now, we'll just simulate it with a placeholder
    const generateCoachingSpeech = async () => {
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

    generateCoachingSpeech()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Your Motivational Speech</h1>
      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg">
        <pre className="whitespace-pre-wrap">{coachingSpeech}</pre>
      </div>
      {/* Add audio player component here when implemented */}
    </div>
  )
}