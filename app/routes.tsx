import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";

const CreatePage = lazy(() => import("~/pages/create-page"));
const HomePage = lazy(() => import("~/pages/home-page"));
const PrewviewPage = lazy(() => import("~/pages/preview-page"));

export const Routes = () => (
  <Router>
    <Route component={HomePage} path="/" />
    <Route component={PrewviewPage} path="/preview" />
    <Route component={CreatePage} path="/create" />
  </Router>
);
