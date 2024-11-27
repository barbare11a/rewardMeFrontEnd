import React, { createContext, useContext } from 'react';
import { Firestore } from 'firebase/firestore/lite';
import { firestore } from '@/firebaseConfig'; // Adjust the import path if needed

const FirestoreContext = createContext<Firestore | null>(null);

export const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <FirestoreContext.Provider value={firestore}>{children}</FirestoreContext.Provider>;
};

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error("useFirestore must be used within a FirestoreProvider");
  }
  return context;
};
