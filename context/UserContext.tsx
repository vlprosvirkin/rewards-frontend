'use client'

import { getCode } from '@/components/InviteSection/getCode';
import { clearCookies } from '@/helpers/clearTgCookies';
import { IUser } from '@/types/user';
import { registerUser } from '@/utils/actions';
import { useSDK } from '@metamask/sdk-react';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userLoading: boolean;
  userError: string | null;
  fetchUser: (account: string) => Promise<void>;
  setReferral: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { account } = useSDK();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referral, setReferral] = useState('')

  const fetchUser = async (account: string) => {
    setLoading(true);
    setError(null);

    try {
      // Check that user exist
      const res = await getCode(account);
      if (res) {
        setUser(res);
        return
      }
      // If not - registered it
      const registerRes = await registerUser({ address: account, referral: referral ? referral.replace(/-/g, '').toLowerCase() : '' });

      if (registerRes?.errors && registerRes?.errors[0]?.message === "User already registered") {
        localStorage?.setItem("isRegistred", "true");
      }
      // Then again asking for user object
      if (registerRes) {
        const res = await getCode(account);
        if (res) {
          setUser(res);
          return
        }
      }
      setUser(null)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message || 'Failed to fetch user data');
      } else {
        setError('An unexpected error occurred');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account && user && user.address === account.toLowerCase()) {
      return
    }
    if (account && ((account && !user) || (account.toLowerCase() !== user?.address))) {
      clearCookies('oauth.telegram.org');
      fetchUser(account);
    } else {
      setUser(null);
      setError(null);
    }
  }, [account, user]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, userError: error, userLoading: loading, setReferral }}>
      {children}
    </UserContext.Provider>
  );
};
