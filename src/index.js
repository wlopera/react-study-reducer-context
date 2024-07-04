import React from "react";
import { createRoot } from "react-dom/client";
//import CallbackView from "./views/CallbackView/CallbackView";
// import ContextView from "./views/ContextView";
// import ContextReducer from "./views/ContextReducer";
import TextAreaView from "./views/TextAreaView/TextAreaView";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<TextAreaView />);
