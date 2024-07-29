import { useContext } from "react";

import { AuthContext } from "../../providers/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, register, login, logout } = context;

  return {
    user,
    register,
    login,
    logout,
  };
};
