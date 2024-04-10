import axiosInstance from "../libs/axiosInstance";

export async function login(username, password) {
  return await axiosInstance.post("/auth/login", { username, password });
}

export async function signup(username, password) {
  return await axiosInstance.post("/auth/signup", { username, password });
}

export async function fetchProfile(token) {
  return await axiosInstance.get("/auth/profile", {
    headers: { Authorization: "Bearer " + token },
  });
}
