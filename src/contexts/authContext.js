import { GetCookie, RemoveCookie, SetCookie } from "src/helpers/cookieHelper";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { getUserRoleByUserId } from "@/services/userService";

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
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(GetCookie(process.env.NEXT_PUBLIC_AUTH));
  const router = useRouter();

  // ** React Query

  // ** Hooks
  const logout = () => {
    RemoveCookie(process.env.NEXT_PUBLIC_AUTH);
    setRole(null);
    setUser(null);
    router.push("/");
  };
  const login = ({ user, role }) => {
    var cookieOptions = {
      secure: false,
      sameSite: "strict",
      expires: moment(user?.expiration).toDate(),
    };
    SetCookie(process.env.NEXT_PUBLIC_AUTH, user, cookieOptions);
    setRole(role);
    setUser(user);
  };
  useEffect(() => {
    if (user?.id != null)
      getUserRoleByUserId(user?.id).then((res) => setRole(res.data));
  }, [user]);

  const values = {
    user,
    role,
    setRole,
    setUser,
    logout,
    login,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
