import Firebase from '../../Firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
/**
 * Auth.js
 * Defines functions relating to firebase user authentication.
 */

const auth = Firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const auth_listeners = [];

// Listener for auth state changes
auth.onAuthStateChanged(u => {
    auth_listeners.forEach(callback => callback(u));
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
export async function login() {
    let user_info = await auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
            return await auth.signInWithPopup(provider);
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
        });

    return await user_info;
}

/**
 * Handles firebase logout
 */
export async function logout() {
    await auth.signOut();
}
