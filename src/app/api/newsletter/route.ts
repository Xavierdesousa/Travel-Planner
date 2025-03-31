import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send welcome email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-sender@example.com',
      subject: 'Welcome to Travel Planner Newsletter!',
      text: 'Thank you for subscribing to our newsletter. We\'ll keep you updated with the latest travel tips and guides.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Travel Planner!</h1>
          <p>Thank you for subscribing to our newsletter. We're excited to share our travel tips, destination guides, and exclusive offers with you.</p>
          <p>Stay tuned for our next update!</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 