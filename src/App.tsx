import React from 'react';
import './App.css';
import HomeView from "./views/HomeView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignupView from "./views/SignupView";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeView/>,
        },
        {
            path: "/auth",
            element: <SignupView/>,
        },
    ]);
  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
}


export default App;
