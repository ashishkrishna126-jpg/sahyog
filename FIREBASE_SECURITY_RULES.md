# Firebase Security Rules Configuration

## Firestore Rules

Go to Firebase Console → Firestore Database → Rules and replace with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Podcasts: Anyone can read, only authenticated admins can write
    match /podcasts/{podcastId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Stories: Anyone can read approved, only authenticated can write
    match /stories/{storyId} {
      allow read: if resource.data.status == 'approved' || request.auth != null;
      allow create: if true; // Allow anonymous story submissions
      allow update, delete: if request.auth != null; // Only admins can moderate
    }
  }
}
```

## Storage Rules

Go to Firebase Console → Storage → Rules and replace with:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Podcast audio files: Anyone can read, only authenticated can upload
    match /podcasts/{audioFile} {
      allow read: if true;
      allow write: if request.auth != null && 
                     request.resource.size < 100 * 1024 * 1024 && // Max 100MB
                     request.resource.contentType.matches('audio/.*');
    }
    
    // Story images (optional): Anyone can read, only authenticated can upload
    match /stories/{imageFile} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.resource.size < 10 * 1024 * 1024 && // Max 10MB
                     request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Firebase Authentication Setup

Currently, your admin uses a passcode for access. To enable Firebase Authentication:

1. Go to Firebase Console → Authentication → Get Started
2. Enable **Email/Password** sign-in method
3. Add an admin user email/password
4. Update Admin page to use Firebase Authentication instead of passcode

### Optional: Simple Auth Integration

Add to `src/config/firebase.ts`:
```typescript
import { getAuth } from 'firebase/auth';

export const auth = getAuth(app);
```

Then admins can sign in with:
```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

await signInWithEmailAndPassword(auth, email, password);
```

## Notes

- Without Firebase Authentication enabled, the security rules will block writes
- For quick testing, you can temporarily set: `allow write: if true;` (NOT recommended for production)
- The current implementation stores files but won't persist without auth
- Consider enabling Firebase Authentication before deploying to production
