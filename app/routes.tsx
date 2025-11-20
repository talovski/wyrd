import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";

const HomePage = lazy(() => import("./pages/home"));

export const Routes = () => (
  <Router>
    <Route component={HomePage} path="/" />
  </Router>
);
