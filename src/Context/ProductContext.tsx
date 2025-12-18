import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Product, Order, DashboardData, ProductContextType } from "../Types/Dashboard";
import { useAuth } from "./AuthContext";

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { state } = useAuth();
	const [products, setProducts] = useState<Product[] | null>(null);
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [dashboard, setDashboard] = useState<DashboardData[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const API = process.env.REACT_APP_API_URL || "";

	const fetchProducts = useCallback(async () => {
		try {
			const response = await fetch(`${API}api/products/getAllProducts`);
			if (!response.ok) throw new Error("Failed to fetch products");
			const data = await response.json();
			setProducts(data);
		} catch (err: any) {
			console.error("Error fetching products:", err);
			setError(err.message);
		}
	}, [API]);

	const fetchOrders = useCallback(async () => {
		try {
			const response = await fetch(`${API}api/orders/getAllOrders`);
			if (!response.ok) throw new Error("Failed to fetch orders");
			const data = await response.json();
			setOrders(data);
		} catch (err: any) {
			console.error("Error fetching orders:", err);
			setError(err.message);
		}
	}, [API]);

	const fetchDashboard = useCallback(async () => {
		try {
			const response = await fetch(`${API}api/dashboards/getDashboard`);
			if (!response.ok) throw new Error("Failed to fetch dashboard data");
			const data = await response.json();
			setDashboard(data);
		} catch (err: any) {
			console.error("Error fetching dashboard:", err);
			setError(err.message);
		}
	}, [API]);

	const refreshAll = useCallback(async () => {
		setLoading(true);
		await Promise.all([fetchProducts(), fetchOrders(), fetchDashboard()]);
		setLoading(false);
	}, [fetchProducts, fetchOrders, fetchDashboard]);

	useEffect(() => {
		if (state.isAuthenticated) {
			refreshAll();
		}
	}, [refreshAll, state.isAuthenticated]);

	return (
		<ProductContext.Provider
			value={{
				products,
				orders,
				dashboard,
				loading,
				error,
				fetchProducts,
				fetchOrders,
				fetchDashboard,
				refreshAll,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
