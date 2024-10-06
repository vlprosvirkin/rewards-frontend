import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
	// define the part you're going to style
	overlay: {
		bg: "blackAlpha.700", //change the background
	},
	dialog: {
		// border: "1px solid rgba(255, 255, 255, 0.09)",
		// borderRadius: "18px",
		bg: "linear-gradient(180deg, rgba(24, 24, 43, 0.6) 0%, rgba(24, 24, 43, 0.42) 100%)",
		rounded: "18px",
	},
});

export const modalTheme = defineMultiStyleConfig({
	baseStyle,
});

export const theme = extendTheme({
	components: { Modal: modalTheme },
});
