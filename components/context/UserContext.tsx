"use client"

import React, { createContext, useState } from 'react';

interface UserContextValue {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};