import { Outlet } from "react-router";
import { Header } from "../components/Header";

export function DefaultLayout() {
	return (
		<div
			style={{
				minHeight: "100vh",
				width: "100%",
				background: "#0a0f1e",
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
				overflowX: "hidden",
			}}
		>
			<Header />

			<main
				style={{
					paddingTop: "80px",
					width: "100%",
					maxWidth: "1280px",
					margin: "0 auto",
					padding: "80px 16px 32px",
					boxSizing: "border-box",
				}}
			>
				<Outlet />
			</main>
		</div>
	);
}