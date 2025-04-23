import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AccessToken } from "../types/accessToken";
import { useAuth } from "./AuthContext";
import { newUser, User, UserCredentials } from "../types/user";
import toast from "react-hot-toast";

interface UserContextProps {
  children: ReactNode;
}
//TODO REVISAR EL FLUJO CON PERMISOS
const UserContext = createContext({
  user: {} as User,
  accessToken: {} as AccessToken,
  logearse: (_data: UserCredentials) => {},
  createUser: (_data: newUser) => {},
  logOut: () => {},
  loading: false,
});

const UserContextProvider = ({ children }: UserContextProps) => {

  const [accessToken, setAccessToken] = useState<AccessToken>({} as AccessToken);
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const access = window.localStorage.getItem("keys");
    const info = window.localStorage.getItem("info");

    if (access && info) {
      setAccessToken(JSON.parse(access));
      setUser(JSON.parse(info));
      auth.changeState();
    }
  }, []);

  const logearse = async (loginData: UserCredentials) => {
    setLoading(true);
    
    await authenticate(loginData);

    await getUserByEmail(loginData.email);
    
    setLoading(false);

    toast.success("Bienvenido!")
  };

  const createUser = async (userData: newUser) => {
    setLoading(true);
    console.log("Creando el usuario", userData);

    try {
      const response = await fetch("http://localhost:8333/api/v1/customers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const userId = await response.json();
        console.log("Usuario creado con éxito", userId);
      }
    } catch (error) {
      console.error(error);
    }

    await authenticate({
      email: userData.userLogin.email,
      password: userData.userLogin.password,
    } as UserCredentials);

    await getUserByEmail(userData.userLogin.email);

    setLoading(false);
    toast.success("Bienvenido!")
  };

  const logOut = () => {
    auth.changeState();
    setUser({} as User);
    setAccessToken({} as AccessToken);
    window.localStorage.clear();
  };

  const authenticate = async (loginData: UserCredentials) => {
    try {
      const response = await fetch("http://localhost:8333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data: AccessToken = await response.json();
        setAccessToken(data);
        auth.changeState();
        window.localStorage.setItem("keys", JSON.stringify(data));
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getUserByEmail = async (email: string) => {
    const keysString = localStorage.getItem("keys");
    const key = keysString ? JSON.parse(keysString) : null;
    
    try {
      const Fetchresponse = await fetch(
        `http://localhost:8333/api/v1/customers/profile/${email}`,{
          headers: {
            "Authorization":`Bearer ${key.access_token}`
          }
        }
      );

      if (!Fetchresponse.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const userResponse: User = await Fetchresponse.json();
      setUser(userResponse);
      window.localStorage.setItem("info", JSON.stringify(userResponse));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, accessToken, logearse, createUser, logOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);