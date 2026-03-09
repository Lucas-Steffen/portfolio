import { Route } from "react-router-dom";
import { Home } from "../pages/view/Home";
import { Header } from "../components/Header";

export function Router() {
	return <Route path="/" element={<Header />} />;
}
