import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext/AuthContext";
import { auth } from "../firebase/firebase.config";







export const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(loading, user);
  const googleSignIn = (provider) => {
    return signInWithPopup(auth, provider)
  }
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const forgotPw = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const authData = {
    user,
    setUser,
    createUser,
    googleSignIn,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    forgotPw

  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;