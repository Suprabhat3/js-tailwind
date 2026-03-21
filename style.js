(() => {
	const ALIGN_VALUES = new Set(["left", "right", "center", "justify"]);

	function isNumeric(value) {
		return /^-?\d+(\.\d+)?$/.test(value);
	}

	function toPx(value) {
		return `${value}px`;
	}

	function applyStyles(element, styles) {
		for (const [property, value] of Object.entries(styles)) {
			element.style.setProperty(property, value);
		}
	}

	function spacingStyles(type, value) {
		const map = {
			p: ["padding"],
			pt: ["padding-top"],
			pr: ["padding-right"],
			pb: ["padding-bottom"],
			pl: ["padding-left"],
			px: ["padding-left", "padding-right"],
			py: ["padding-top", "padding-bottom"],
			m: ["margin"],
			mt: ["margin-top"],
			mr: ["margin-right"],
			mb: ["margin-bottom"],
			ml: ["margin-left"],
			mx: ["margin-left", "margin-right"],
			my: ["margin-top", "margin-bottom"],
		};

		const props = map[type];
		if (!props || !isNumeric(value)) {
			return null;
		}

		const size = toPx(value);
		const result = {};
		for (const prop of props) {
			result[prop] = size;
		}
		return result;
	}

	function textStyles(value) {
		if (ALIGN_VALUES.has(value)) {
			return { "text-align": value };
		}
		if (isNumeric(value)) {
			return { "font-size": toPx(value) };
		}
		return { color: value };
	}

	function borderStyles(value) {
		if (isNumeric(value)) {
			return {
				"border-width": toPx(value),
				"border-style": "solid",
			};
		}
		return { "border-color": value };
	}

	function parseUtilityClass(className) {
		if (!className.startsWith("chai-")) {
			return null;
		}

		const parts = className.split("-");
		if (parts.length < 3 || parts[0] !== "chai") {
			return null;
		}

		const key = parts[1];
		const value = parts.slice(2).join("-");

		if (!value) {
			return null;
		}

		const spacing = spacingStyles(key, value);
		if (spacing) {
			return spacing;
		}

		if (key === "bg") {
			return { "background-color": value };
		}

		if (key === "text") {
			return textStyles(value);
		}

		if (key === "border") {
			return borderStyles(value);
		}

		if (key === "rounded" && isNumeric(value)) {
			return { "border-radius": toPx(value) };
		}

		if (key === "w" && isNumeric(value)) {
			return { width: toPx(value) };
		}

		if (key === "h" && isNumeric(value)) {
			return { height: toPx(value) };
		}

		return null;
	}

	function applyChaiUtilities(options = {}) {
		const { removeClasses = false } = options;
		const elements = document.querySelectorAll("[class]");

		elements.forEach((element) => {
			const classes = Array.from(element.classList);

			classes.forEach((className) => {
				const styles = parseUtilityClass(className);
				if (!styles) {
					return;
				}

				applyStyles(element, styles);
				if (removeClasses) {
					element.classList.remove(className);
				}
			});
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		applyChaiUtilities({ removeClasses: false });
	});

	window.applyChaiUtilities = applyChaiUtilities;
})();
