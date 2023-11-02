import axios from "axios";
import { useNavigate } from "react-router-dom";
export function useUserActions() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api";

  function register(data) {
    return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
      // Registering the account and tokens in the
      // store
      setUserData(res.data);
      navigate("/");
    });
  }
  // Login the user
  function login(data) {
    return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
      // Registering the account and tokens in the
      // store
      setUserData(res.data);
      navigate("/");
    });
  }

  // Logout the user
  function logout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return {
    login,
    register,
    logout,
  };
}

// Get the user
export function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.user;
}

// Get the access token
export function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
export function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

export function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}
