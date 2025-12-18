import classes from "./loading.module.css";

export const LoadingComponent = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark z-50'>
			<div className={classes.LoadingComponent}></div>
		</div>
	);
};
