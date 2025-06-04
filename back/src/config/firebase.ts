import * as admin from 'firebase-admin';
import {
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_ADMIN_AUTH_URI,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_CLIENT_ID,
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_PRIVATE_KEY_ID,
  FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_TOKEN_URI,
} from './environments';

const firebaseConfig = {
  project_id: FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: FIREBASE_ADMIN_AUTH_URI,
  token_uri: FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
