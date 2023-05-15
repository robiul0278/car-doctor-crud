import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CREATE NEW USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SIGN IN A USER
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SIGN OUT A USER
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // GOOGLE SIGN IN
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // CURRENTLY ACTIVE SIGN-IN USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user in auth Provider", currentUser);
      setLoading(false);
      if(currentUser && currentUser.email){
        const loggedUser = {
            email: currentUser.email
        }
        fetch('https://car-doctor-server-tawny-seven.vercel.app/jwt', {
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loggedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('jwt response', data);
            localStorage.setItem('car-access-token', data.token);
        })
    }
    else{
        localStorage.removeItem('car-access-token');
    }
    });
    return () => {
     return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
