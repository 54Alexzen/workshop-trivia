import { config } from 'dotenv';

config();

export const {
  PORT = '3000',
  WEB_ORIGIN = 'http://localhost:3000',
  MOBILE_ORIGIN = 'http://localhost:3000',
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_ID,
  FIREBASE_ADMIN_PRIVATE_KEY_ID,
  FIREBASE_ADMIN_AUTH_URI,
  FIREBASE_ADMIN_TOKEN_URI,
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
} = process.env;

export const CONFIG = {
  PATH_JSON: '../../src/data/tracks.json',
  DEZZER_URL_API_PLAYLIST: 'https://api.deezer.com/chart/0/playlists?limit=20',
};