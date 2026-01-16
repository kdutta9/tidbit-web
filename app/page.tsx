'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('You\'re on the list! We\'ll be in touch soon.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900/50 via-black to-black" />
      
      <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
        {/* Logo/Brand */}
        <div className="space-y-6">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
          >
            tidbit
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl text-zinc-300 font-light tracking-wide">
            never cram again
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-400 font-medium tracking-wide uppercase">
              launching soon
            </span>
          </div>
        </div>

        {/* Beta Signup Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Beta'}
              </button>
            </div>

            {message && (
              <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'} animate-fade-in`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Subtle footer note */}
        <div className="pt-12 text-xs text-zinc-700">
          <p>built for learners</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, rgba(63, 63, 70, 0.3) 0%, rgba(0, 0, 0, 1) 70%);
        }
      `}</style>
    </main>
  )
}
