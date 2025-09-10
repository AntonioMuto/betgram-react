'use client'
import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  name?: string;
  timezone: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const defaultUser: User = {
    timezone: "Europe/Rome", // ⚡️ timezone di default
  };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
