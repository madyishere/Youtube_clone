//LoginForm.jsx
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify"


export const fetchUserData = async (token) => {
  try {
    if (token) {
      const response = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `JWT ${token}`,
        }
      });
      if (response.status === 200) {
        return response.data.existingUser;  
      }
    } else {
      return null;
    }
  }
  catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmmision = async(e) => 
  {
    try {

      e.preventDefault();
      console.log(email,password);
  
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(response);
      toast.success("Logged In Successfully!")
      sessionStorage.setItem("token", response.data.token);
  
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      throw new Error(e);
    } 
  };




  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <UserCircleIcon className="w-16 h-16 text-blue-500" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form className="flex flex-col gap-4">
        {/* <label className="flex flex-col">
          <span className="mb-1 text-gray-600">Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label> */}
        <label className="flex flex-col">
          <span className="mb-1 text-gray-600">Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-gray-600">Password</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button onClick={formSubmmision}  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
      </form>
      <Link to ="/register" className="text-blue-500 text-center mt-4">Don't have an account? Register</Link>
    </div>
  );
}

export default LoginForm;
