import { Outlet } from "react-router";
import { Header } from "../components/Header";

export function DefaultLayout() {
	return <div className="app-shell"><Header /><main><Outlet /></main></div>;
}
