import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/sign-up',
      element: <SignUp/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App