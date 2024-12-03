import HomeView from "../views/HomeView";
import LoginView from "../views/AuthView";
import AddPostView from "../views/AddPostView";
import PostsView from "../views/PostsView";
import React from "react";
import {createBrowserRouter, RouteObject} from "react-router-dom";

const routes:RouteObject[] = [
    {
        path: "/",
        element: (<HomeView/>),
    },
    {
        path: "/auth",
        element: (<LoginView/>),
    },
    {
        path: "/post",
        element: (<AddPostView/>),

    },
    {
        path: "/posts",
        element: (<PostsView/>),
    }
];
const router = createBrowserRouter(routes);

export default router;
