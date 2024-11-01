import axios from "axios"

const API_URL = "/api/users"
 
//Register user

export const authRegister = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if(response.data){
    localStorage.setItem("user",JSON.stringify(response.data))
  }
  return response.data
}

// Login user
export const authLogin = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
  if(response.data){
    localStorage.setItem("user",JSON.stringify(response.data))
  }
  return response.data
}

// Log out user
export const authLogout = () => localStorage.removeItem("user")