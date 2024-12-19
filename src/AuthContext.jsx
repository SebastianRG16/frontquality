import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refresh"),
    idUser: localStorage.getItem("idUser"),
  });

  const login = (data) => {
    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("idUser", data.user.id_user);
    setAuth({
      isAuthenticated: true,
      token: data.access,
      refreshToken: data.refresh,
      idUser: data.user.id_user,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("idUser");
    setAuth({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      idUser: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
