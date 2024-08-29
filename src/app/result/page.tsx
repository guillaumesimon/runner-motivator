import { getSessionDetails } from '@/lib/db'

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
          {sessionDetails.audio_files && sessionDetails.audio_files.map((file: string, index: number) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}