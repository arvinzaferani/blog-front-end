import LoginView from "../views/AuthView";
import AddPostView from "../views/AddPostView";
import PostsView from "../views/PostsView";
import React from "react";
import {createBrowserRouter, RouteObject} from "react-router-dom";
import ProfileView from "../views/ProfileView";
import UpdatePostView from "../views/UpdatePostView";

const routes:RouteObject[] = [
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
    },
    {
        path: "/posts/update/:id",
        element: (<UpdatePostView/>),
    },
    {
        path: "/profile",
        element: (<ProfileView/>),
    }
];
const router = createBrowserRouter(routes);

export default router;
