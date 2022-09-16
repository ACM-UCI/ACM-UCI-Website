import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import Firebase from '../../Firebase';
/**
 * Auth.js
 * Defines functions relating to firebase user authentication.
 */

const auth = getAuth();
const provider = new GoogleAuthProvider();
const auth_listeners = [];

// Listener for auth state changes
auth.onAuthStateChanged((u) => {
    auth_listeners.forEach((callback) => callback(u));
});

/**
 * The provided callback function is invoked whenever the authentication state is changed.
 * @param {function} callback
 */
export function addAuthListener(callback) {
    auth_listeners.push(callback);
}

/**
 * Returns the currently logged in user. null if no logged in user.
 */
export async function getUser() {
    return await auth.currentUser;
}

/**
 * Handles firebase login.
 * Returns a promise with fulfillment callback argument `user_info` which is user info returned by firebase.
 */
export function login() {
    const user_info = setPersistence(auth, browserLocalPersistence)
        .then(() => signInWithPopup(auth, provider))
        .catch((error) => {
            console.error(error.code);
            console.error(error.message);
        });

    return user_info;
}

/**
 * Handles firebase logout
 */
export async function logout() {
    await auth.signOut();
}
