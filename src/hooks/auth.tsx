import { createContext, ReactNode, useContext } from 'react';

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
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'ped@gmail',
    avatar_url: 'https://avatars.githubusercontent.com/u/19227876',
  } as User;

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  // user: {
  //   id: '1',
  //   name: 'John Doe',
  //   email: 'ped@gmail',
  //   avatar_url: 'https://avatars.githubusercontent.com/u/19227876',
  // },

  return context;
};

export { AuthProvider, useAuth };
