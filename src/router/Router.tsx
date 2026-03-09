import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/view/Home";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function Router() {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Routes>
	);
}
