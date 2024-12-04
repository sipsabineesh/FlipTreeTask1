// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import MainLayout from "./components/MainLayout";
// import Signup from "./components/Signup";
// import ProductList from "./components/ProductList";
// import Cart from "./components/Cart";

// //   {
// //     path: "/",
// //     element: <MainLayout />,
// //     children:[
// //      { 
// //       path: '/',
// //       element: <Home/>,
// //      },
// //      { 
// //       path: '/profile',
// //       element: <Profile/>,
// //      },

// //     ],
// //   },
// //   {
// //     path: '/login',
// //     element: <Login />
// //   },
// //   {
// //     path: '/signup',
// //     element: <Signup />
// //   },
// // ]);
// function App() {
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]);
//   return (
//     <>
//      <Router>
//         <Routes>
//           <Route
//             path="/"
//             // element={<ProductList />}
//             element={user ? <ProductList cart={cart} setCart={setCart} /> : <Navigate to="/login" />}
//             // element={<ProductList cart={cart} setCart={setCart} /> }

//           />
//           <Route
//             path="/cart"
//             // element={<Cart cart={cart} removeFromCart={removeFromCart} /> }

//             element={user ? <Cart cart={cart} removeFromCart={removeFromCart} /> : <Navigate to="/login" />}
//           />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Signup from "./components/Signup";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
console.log("-",cart)
  return (
    <Router>
      <div>
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Shopping App</h1>
          {isLoggedIn ? (
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <div>
              <a href="/login" className="text-white px-4">Login</a>
              <a href="/signup" className="text-white px-4">Sign Up</a>
            </div>
          )}
        </header>

        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/products" element={<ProductList setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/" element={<ProductList setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
