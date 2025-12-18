import React from "react";
// import TopRevenue from "../Homepage/TopRevenue/TopRevenue";

import Table from "./OrderTable/orderTable";
import classes from "./orderList.module.css";
// import data from "./orderList.json";
import { useProductContext } from "@/Hooks/useProducts";

// interface orderProps {
// 	orders: {
// 		orderId: string;
// 		userId: string;
// 		products: {
// 			productId: string;
// 			quantity: number;
// 		}[];
// 		orderDate: string;
// 	}[];
// }

const OrderList: React.FC = () => {
	const { orders } = useProductContext();

	return (
		<div className={`${classes.order} bg-surface-light dark:bg-surface-black p-4 rounded-lg shadow-md transition-colors duration-300`}>
			<div className={classes.table}>
				<Table data={orders} />
			</div>
		</div>
	);
};
export default OrderList;
