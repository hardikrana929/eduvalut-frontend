import { jwtDecode } from "jwt-decode";

const getDecodedUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

export const useAuth = () => {
  return getDecodedUser();
};
