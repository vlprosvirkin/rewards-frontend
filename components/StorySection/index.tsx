import { Mobile } from "./mobile";
import { Desktop } from "./desktop";
import { useWindowSize } from "@/hooks/useWindowSize";

export const StorySection: React.FC = () => {
  const { isMobile } = useWindowSize();
  // useEffect(() => {
  // 	const handleResize = () => {
  // 		setWidth(window.innerWidth);
  // 	};

  // 	window.addEventListener("resize", handleResize);

  // 	// Задаем ширину при первом рендере
  // 	handleResize();

  // 	return () => {
  // 		window.removeEventListener("resize", handleResize);
  // 	};
  // }, []);

  // // Пока ширина неизвестна, ничего не рендерим
  // if (width === null) {
  // 	return <Desktop />;
  // }

  return isMobile ? <Mobile /> : <Desktop />;
};
