import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import BasePage from 'pages/BasePage'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
  },
]);

