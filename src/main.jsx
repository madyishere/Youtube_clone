import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './Components/LoginForm.jsx'
import VideoPlayer from './Components/VideoPlayer.jsx'
import RegisterForm from './Components/Register.jsx'
import Profile from './Components/Profile.jsx'
import Channel from './Components/Channel.jsx'
import { ToastContainer } from 'react-toastify'

const appRouter = createBrowserRouter([
  { 
    path: "/",
    element: <App />, // App acts as the layout
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path:"/video/:id",
    element: <VideoPlayer />
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/channel/:channelId",
    element: <Channel />,
  },
  {
    path: "/channel",
    element: <Channel />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToastContainer />
     <RouterProvider router={appRouter} />
  </StrictMode>,
)
