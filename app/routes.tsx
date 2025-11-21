import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";

const HomePage = lazy(() => import("./pages/home-page"));

export const Routes = () => (
  <Router>
    <Route component={HomePage} path="/" />
  </Router>
);
