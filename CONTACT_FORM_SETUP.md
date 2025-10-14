# Contact Form Email Setup Instructions

The contact form is now configured to send emails to **poodleco1@gmail.com** using Resend.

## Setup Steps

### 1. Sign up for Resend (Free)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. The free tier includes:
   - 100 emails per day
   - 3,000 emails per month
   - Perfect for a contact form!

### 2. Get Your API Key

1. After signing in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Poodle & Co. Contact Form")
4. Copy the API key (it will only be shown once!)

### 3. Add API Key to Your Project

Create a file named `.env.local` in the root of your project (same directory as `package.json`) and add:

```
RESEND_API_KEY=re_your_actual_api_key_here
```

**Important:** Replace `re_your_actual_api_key_here` with your actual API key from Resend.

### 4. Restart Your Development Server

If your dev server is running, restart it so it picks up the new environment variable:

```bash
# Stop the server (Ctrl+C), then restart:
npm run dev
```

### 5. Test the Contact Form

1. Go to your contact page
2. Fill out the form
3. Click "Send Message"
4. You should receive an email at poodleco1@gmail.com

## How It Works

1. **User fills out form** → Name, email, phone (optional), and message
2. **Form submits to API route** → `/api/contact`
3. **API route sends email** → Via Resend to poodleco1@gmail.com
4. **User sees confirmation** → Success or error message

## Email Format

Emails will include:
- Sender's name and contact information
- Their message
- Reply-To set to the sender's email (you can reply directly)

## Troubleshooting

### "Failed to send message" Error

1. **Check your API key:**
   - Make sure `.env.local` file exists
   - Verify the API key is correct (no extra spaces)
   - Restart your dev server

2. **Check Resend dashboard:**
   - Log into Resend
   - Go to "Emails" to see if any were sent
   - Check "Logs" for any errors

3. **Check browser console:**
   - Open browser Developer Tools (F12)
   - Look for any error messages

### Emails Not Arriving

1. **Check spam folder** at poodleco1@gmail.com
2. **Verify email address** in `app/api/contact/route.ts` (line 21)
3. **Check Resend logs** in the dashboard

## Custom Domain (Optional - Advanced)

By default, emails come from `onboarding@resend.dev`. To use your own domain:

1. Add your domain in Resend dashboard
2. Add DNS records to verify ownership
3. Update the `from` field in `app/api/contact/route.ts` to use your domain

Example:
```typescript
from: 'Poodle & Co. <contact@yourdomain.com>'
```

## Support

If you have issues:
- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com

