//Register.jsx
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  
  const formSubmmision = async(e) => 
  {
    e.preventDefault();
    console.log(email,password);
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    console.log(response);
    if(response.ok == true)
    {
      alert('User Registered');
    }
    else
    {
      alert('error occurred')
    }
  };




  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <UserCircleIcon className="w-16 h-16 text-blue-500" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1 text-gray-600">Username</span>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
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
          SignUp
        </button>
      </form>
      <Link to ="/login" className="text-blue-500 text-center mt-4">have an account? Sign In</Link>
    </div>
  );
}

export default RegisterForm;
