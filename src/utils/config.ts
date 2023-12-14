import admin from 'firebase-admin';
import key from './key.json'
console.log(typeof key)
admin.initializeApp({
    credential: admin.credential.cert(key as any)
});
export const usersDB = admin.firestore().collection("Users");
export const linkDb = admin.firestore().collection("Links");