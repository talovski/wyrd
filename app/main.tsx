/* @refresh reload */
import { render } from "solid-js/web";

import "./main.css";
import { Routes } from "./routes";

const app = document.getElementById("app");

render(() => <Routes />, app!);
