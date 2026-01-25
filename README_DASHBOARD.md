# Firebase Dashboard CMS - Setup Guide

This guide will help you set up and use the Firebase Dashboard CMS for managing your website content.

## Prerequisites

- Node.js and npm installed
- A Firebase project created at [Firebase Console](https://console.firebase.google.com/)

## Installation

1. **Install Firebase SDK** (if not already installed):
   ```bash
   npm install firebase
   ```

2. **Set up Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable the following services:
     - **Authentication** (Email/Password provider)
     - **Firestore Database**
     - **Storage**

3. **Configure Environment Variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase configuration values:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```
   - You can find these values in Firebase Console → Project Settings → General → Your apps

4. **Set up Firestore Security Rules**:
   - Go to Firestore Database → Rules
   - Use these rules (adjust as needed):
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /siteContent/{document} {
           // Only authenticated users can read/write
           allow read: if request.auth != null;
           allow write: if request.auth != null;
         }
       }
     }
     ```

5. **Set up Storage Security Rules**:
   - Go to Storage → Rules
   - Use these rules:
     ```javascript
     rules_version = '2';
     service firebase.storage {
       match /b/{bucket}/o {
         match /{allPaths=**} {
           // Only authenticated users can upload/delete
           allow read: if request.auth != null;
           allow write: if request.auth != null;
         }
       }
     }
     ```

6. **Create Admin User**:
   - Go to Authentication → Users
   - Click "Add user"
   - Enter email and password for your admin account
   - Save the credentials (you'll need them to log in)

7. **Migrate Existing Data** (Optional):
   - If you want to migrate your existing `data.json` to Firestore:
   - Make sure you're logged in to Firebase (run Firebase CLI login if needed)
   - The migration can be done through the dashboard after first login, or you can create a script to run it

## Usage

### Accessing the Dashboard

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login` in your browser

3. Log in with the admin credentials you created

4. You'll be redirected to `/dashboard`

### Managing Content

The dashboard is organized into sections:

- **Overview**: Quick access to all sections
- **Home Page**: Edit hero, values, gallery, testimonials, and CTA sections
- **Who We Are**: Edit story, values, and gallery images
- **Our Dogs**: Manage breeding dogs information
- **Available Puppies**: Add, edit, or remove available puppies
- **Past Puppies**: Manage past puppies gallery
- **Upcoming Litters**: Manage upcoming litters information
- **Reviews**: Manage customer reviews
- **Contact**: Update contact information and social links
- **Settings**: Manage site name, tagline, and navigation

### Features

- **Image Upload**: Click on image fields to upload new images
- **Array Management**: Use "Add" buttons to add new items, edit/delete icons to manage existing items
- **Real-time Preview**: Changes are saved to Firestore and reflected on the public site
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Troubleshooting

### Authentication Issues

- Make sure Email/Password provider is enabled in Firebase Console
- Verify your environment variables are correct
- Check browser console for error messages

### Firestore Issues

- Ensure Firestore is enabled in Firebase Console
- Check security rules allow authenticated access
- Verify your project ID matches in environment variables

### Storage Issues

- Ensure Storage is enabled in Firebase Console
- Check storage security rules
- Verify file size limits (default: 10MB max)

### Data Not Loading

- Check browser console for errors
- Verify Firestore connection
- The system will fall back to `data.json` if Firestore is unavailable

## Security Notes

- Always use strong passwords for admin accounts
- Keep your Firebase credentials secure
- Regularly review Firestore and Storage security rules
- Consider implementing additional security measures for production

## Support

For issues or questions, check:
- Firebase Documentation: https://firebase.google.com/docs
- Next.js Documentation: https://nextjs.org/docs
