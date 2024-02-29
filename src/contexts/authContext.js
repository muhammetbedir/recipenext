import { GetCookie, RemoveCookie } from "src/helpers/cookieHelper";
import { createContext, useContext, useState } from "react";

const defaultProvider = {
  user: null,
  setUser: () => null,
  role: null,
  setRole: () => null,
  logout: () => null,
};
const AuthContext = createContext(defaultProvider);
const AuthProvider = ({ children }) => {
  // ** States
  const [role, setRole] = useState(GetCookie("role") ?? null);
  const [user, setUser] = useState(defaultProvider.user);

  // ** Hooks
  const logout = () => {
    RemoveCookie("role");
    setRole(null);
    setUser(null);
  };
  const values = {
    // user: GetCookie(process.env.NEXT_PUBLIC_AUTH),
    user,
    role,
    setRole,
    setUser,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
