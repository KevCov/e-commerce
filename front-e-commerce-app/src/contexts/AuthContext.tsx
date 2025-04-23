import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  changeState: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changeState = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, changeState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
