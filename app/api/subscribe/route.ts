import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    // Insert email into beta_signups table
    const { error } = await supabase
      .from('beta_signups')
      .insert([{ email, created_at: new Date().toISOString() }])
    
    if (error) {
      // Handle duplicate email error gracefully
      if (error.code === '23505') {
        return NextResponse.json(
          { success: true, message: 'You\'re already on the list!' },
          { status: 200 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined the beta!' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Beta signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to join beta. Please try again.' },
      { status: 500 }
    )
  }
}
