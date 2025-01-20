import { lazy } from "react";

export * from "./item";
export * from "./input";
export * from "./button";
export * from "./container";

export const Modal = lazy(() => import("./modal"));