# Firebase Setup Instructions

You're seeing this error because Firebase is not yet configured. Follow these steps to set up Firebase:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Required Services

### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable **Email/Password** provider
5. Click "Save"

### Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll set security rules later)
4. Select a location for your database
5. Click "Enable"

### Enable Storage
1. In Firebase Console, go to **Storage**
2. Click "Get started"
3. Start in test mode (we'll set security rules later)
4. Click "Next" and then "Done"

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. If you don't have a web app, click the `</>` icon to add one
5. Register your app with a nickname (e.g., "Poodle Co Website")
6. Copy the configuration values

## Step 4: Add Configuration to .env.local

1. Open your `.env.local` file in the project root
2. Add the following (replace with your actual values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** Replace all placeholder values with your actual Firebase configuration values!

## Step 5: Set Security Rules

### Firestore Security Rules
1. Go to **Firestore Database** → **Rules**
2. Replace with:
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
3. Click "Publish"

### Storage Security Rules
1. Go to **Storage** → **Rules**
2. Replace with:
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
3. Click "Publish"

## Step 6: Create an Admin User

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter an email and password for your admin account
4. Click "Add user"
5. **Save these credentials** - you'll need them to log in to the dashboard

## Step 7: Restart Your Development Server

After adding the environment variables:
1. Stop your development server (Ctrl+C)
2. Restart it: `npm run dev`
3. The Firebase error should be resolved

## Step 8: Test the Dashboard

1. Navigate to `/login` in your browser
2. Log in with the admin credentials you created
3. You should be redirected to `/dashboard`

## Troubleshooting

### Still seeing "invalid-api-key" error?
- Make sure you copied the correct values from Firebase Console
- Verify your `.env.local` file is in the project root
- Restart your development server after adding environment variables
- Check that all variables start with `NEXT_PUBLIC_`

### Can't log in?
- Verify Email/Password authentication is enabled in Firebase Console
- Check that you created a user in Authentication → Users
- Make sure you're using the correct email and password

### Firestore errors?
- Verify Firestore is enabled in Firebase Console
- Check that security rules are published
- Ensure your project ID matches in `.env.local`

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs) or the `README_DASHBOARD.md` file.
