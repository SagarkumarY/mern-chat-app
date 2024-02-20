import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authuser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <Routes>
        {/* Route for the home page */}
        <Route
          path="/"
          element={authuser ? <Home /> : <Navigate to="/login" />}
        />
        {/* Route for the login page */}
        <Route
          path="/login"
          element={authuser ? <Navigate to="/" /> : <Login />}
        />
        {/* Route for the signup page */}
        <Route
          path="/signup"
          element={authuser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;



























// import { Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import { Toaster } from "react-hot-toast";
// import { useAuthContext } from "./context/AuthContext";
// function App() {
//   const { authuser } = useAuthContext();
//   return (
//     <div className="p-4 h-screen flex items-center justify-center ">
//       <Routes>
//         <Route
//           path="/"
//           element= authuser ? <Home /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/login"
//           element =authuser ? <Navigate to="/" /> : <Login />}
//         />
//         <Route
//           path="/signup"
//           element= authuser ? <Navigate to="/" /> : <Signup />}
//         />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// }

// export default App;
