import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Runner Motivator</h1>
      <Link href="/profile" className="text-blue-500 hover:underline">
        Set Up Profile
      </Link>
      <Link href="/session" className="text-blue-500 hover:underline mt-4">
        Create Session
      </Link>
    </main>
  )
}