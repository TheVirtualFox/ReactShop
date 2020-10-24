import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

console.log('FIREBASE CONFIG FILE');

const config = {
    apiKey: "AIzaSyC9xVJiAMHtUEStoXsmscGk0gdNjjYA9tE",
    authDomain: "gun-db.firebaseapp.com",
    databaseURL: "https://gun-db.firebaseio.com",
    projectId: "gun-db",
    storageBucket: "gun-db.appspot.com",
    messagingSenderId: "1052891229816",
    appId: "1:1052891229816:web:b1ffce8d6fe05fccaf878d"
};



// Initialize Firebase
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.error('error creating user', error.message);
        }
    }
    return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;