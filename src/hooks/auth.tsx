// @ts-ignore
import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export interface IAuthContextData {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
      const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
      const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
      const SCOPE = encodeURI(process.env.REACT_APP_SCOPE);

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { type, params } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatar_url: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName.givenName;
        const avatar_url = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          email: credential.email,
          name,
          avatar_url,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  };

  useEffect(() => {
    // try to get user from storage
    (async () => {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    })(); // function auto-invoked
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
