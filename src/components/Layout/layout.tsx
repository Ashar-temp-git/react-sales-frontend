import React from "react";
import classes from "./layout.module.css";
import TopBar from "../TopBar/TopBar";
import NavBar from "../Navbar/navBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

	return (
		<div className={`${classes.home_main} bg-surface-light  dark:bg-surface-black transition-colors duration-300`}>
			<div className={`${classes.topBar} bg-surface-light dark:bg-surface-black`}>
				<TopBar onMenuClick={() => setMobileNavOpen(!mobileNavOpen)} />
			</div>
			<div className={`${classes.navBar} bg-surface-light dark:bg-surface-black`}>
				<NavBar mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
			</div>
			<div className={`${classes.content} bg-surface-light dark:bg-surface-black`}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
