"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const usePageLoading = () => {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoading(true);

		// Симулируем задержку для демонстрации загрузки, можно убрать
		const timer = setTimeout(() => {
			setLoading(false);
		}, 500); // Задержка 500 мс, можно настроить по желанию

		return () => clearTimeout(timer);
	}, [pathname]);

	return loading;
};

export default usePageLoading;
