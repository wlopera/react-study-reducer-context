import React from "react";
import { createRoot } from "react-dom/client";
import ContextView from "./views/ContextView";
import ContextReducer from "./views/ContextReducer";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<ContextReducer />);
