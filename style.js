const TEXT_ALIGNMENT_VALUES = ["left", "right", "center", "justify"];
const FLEX_ALIGNMENT_VALUES = ["start", "end", "center", "between", "around", "evenly"];

const SPACING_PROPERTY_MAP = {
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

function isNumericValue(value) {
  const numberPattern = /^-?\d+(\.\d+)?$/;
  return numberPattern.test(value);
}

function addPxUnit(value) {
  return value + "px";
}

function classStartsWithChaiPrefix(className) {
  return className.startsWith("chai-");
}

function applyStyleObjectToElement(element, styleObject) {
  const styleEntries = Object.entries(styleObject);

  for (let index = 0; index < styleEntries.length; index += 1) {
    const entry = styleEntries[index];
    const propertyName = entry[0];
    const propertyValue = entry[1];

    element.style.setProperty(propertyName, propertyValue);
  }
}

function parseSpacingUtility(utilityKey, utilityValue) {
  const propertiesToUpdate = SPACING_PROPERTY_MAP[utilityKey];

  if (!propertiesToUpdate) {
    return null;
  }

  const isMarginUtility = utilityKey.startsWith("m");
  if (isMarginUtility && utilityValue === "auto") {
    const styleObject = {};

    for (let index = 0; index < propertiesToUpdate.length; index += 1) {
      const propertyName = propertiesToUpdate[index];
      styleObject[propertyName] = "auto";
    }

    return styleObject;
  }

  if (!isNumericValue(utilityValue)) {
    return null;
  }

  const cssValue = addPxUnit(utilityValue);
  const styleObject = {};

  for (let index = 0; index < propertiesToUpdate.length; index += 1) {
    const propertyName = propertiesToUpdate[index];
    styleObject[propertyName] = cssValue;
  }

  return styleObject;
}

function parseTextUtility(utilityValue) {
  const isTextAlignmentValue = TEXT_ALIGNMENT_VALUES.includes(utilityValue);
  if (isTextAlignmentValue) {
    return { "text-align": utilityValue };
  }

  if (isNumericValue(utilityValue)) {
    return { "font-size": addPxUnit(utilityValue) };
  }

  return { color: utilityValue };
}

function parseBorderUtility(utilityValue) {
  if (isNumericValue(utilityValue)) {
    return {
      "border-width": addPxUnit(utilityValue),
      "border-style": "solid",
    };
  }

  return { "border-color": utilityValue };
}

function parseFixedUtilityClass(className) {
  if (className === "chai-flex") {
    return { display: "flex" };
  }

  if (className === "chai-grid") {
    return { display: "grid" };
  }

  if (className === "chai-block") {
    return { display: "block" };
  }

  if (className === "chai-inline-block") {
    return { display: "inline-block" };
  }

  if (className === "chai-wrap") {
    return { "flex-wrap": "wrap" };
  }

  if (className === "chai-nowrap") {
    return { "flex-wrap": "nowrap" };
  }

  return null;
}

function convertFlexAlignmentValue(utilityValue) {
  if (utilityValue === "start") {
    return "flex-start";
  }

  if (utilityValue === "end") {
    return "flex-end";
  }

  if (utilityValue === "between") {
    return "space-between";
  }

  if (utilityValue === "around") {
    return "space-around";
  }

  if (utilityValue === "evenly") {
    return "space-evenly";
  }

  return utilityValue;
}

function splitUtilityClass(className) {
  const parts = className.split("-");

  if (parts.length < 3) {
    return null;
  }

  if (parts[0] !== "chai") {
    return null;
  }

  const utilityKey = parts[1];
  const utilityValue = parts.slice(2).join("-");

  if (!utilityValue) {
    return null;
  }

  return {
    key: utilityKey,
    value: utilityValue,
  };
}

function parseUtilityClass(className) {
  if (!classStartsWithChaiPrefix(className)) {
    return null;
  }

  const fixedUtilityStyle = parseFixedUtilityClass(className);
  if (fixedUtilityStyle) {
    return fixedUtilityStyle;
  }

  const parsedUtility = splitUtilityClass(className);
  if (!parsedUtility) {
    return null;
  }

  const utilityKey = parsedUtility.key;
  const utilityValue = parsedUtility.value;

  const spacingStyle = parseSpacingUtility(utilityKey, utilityValue);
  if (spacingStyle) {
    return spacingStyle;
  }

  if (utilityKey === "bg") {
    return { "background-color": utilityValue };
  }

  if (utilityKey === "text") {
    return parseTextUtility(utilityValue);
  }

  if (utilityKey === "border") {
    return parseBorderUtility(utilityValue);
  }

  if (utilityKey === "rounded" && isNumericValue(utilityValue)) {
    return { "border-radius": addPxUnit(utilityValue) };
  }

  if (utilityKey === "w" && isNumericValue(utilityValue)) {
    return { width: addPxUnit(utilityValue) };
  }

  if (utilityKey === "h" && isNumericValue(utilityValue)) {
    return { height: addPxUnit(utilityValue) };
  }

  if (utilityKey === "maxw" && isNumericValue(utilityValue)) {
    return { "max-width": addPxUnit(utilityValue) };
  }

  if (utilityKey === "gap" && isNumericValue(utilityValue)) {
    return { gap: addPxUnit(utilityValue) };
  }

  if (utilityKey === "font" && utilityValue === "bold") {
    return { "font-weight": "700" };
  }

  if (utilityKey === "decoration" && utilityValue === "none") {
    return { "text-decoration": "none" };
  }

  if (utilityKey === "flex" && (utilityValue === "row" || utilityValue === "col")) {
    if (utilityValue === "row") {
      return { "flex-direction": "row" };
    }

    return { "flex-direction": "column" };
  }

  if (utilityKey === "justify" && FLEX_ALIGNMENT_VALUES.includes(utilityValue)) {
    const cssValue = convertFlexAlignmentValue(utilityValue);
    return { "justify-content": cssValue };
  }

  if (utilityKey === "items" && (utilityValue === "start" || utilityValue === "end" || utilityValue === "center" || utilityValue === "stretch")) {
    const cssValue = convertFlexAlignmentValue(utilityValue);
    return { "align-items": cssValue };
  }

  if (utilityKey === "cols" && isNumericValue(utilityValue)) {
    return {
      "grid-template-columns": "repeat(" + utilityValue + ", minmax(0, 1fr))",
    };
  }

  if (utilityKey === "rows" && isNumericValue(utilityValue)) {
    return {
      "grid-template-rows": "repeat(" + utilityValue + ", minmax(0, 1fr))",
    };
  }

  return null;
}

function applyUtilitiesToElement(element, classNames, options = {}) {
  const removeClassesOption = options.removeClasses === true;
  const unsupportedClasses = [];

  for (let index = 0; index < classNames.length; index += 1) {
    const className = classNames[index];

    if (!classStartsWithChaiPrefix(className)) {
      continue;
    }

    const parsedStyleObject = parseUtilityClass(className);
    if (!parsedStyleObject) {
      unsupportedClasses.push(className);
      continue;
    }

    applyStyleObjectToElement(element, parsedStyleObject);

    if (removeClassesOption) {
      element.classList.remove(className);
    }
  }

  return unsupportedClasses;
}

function applyChaiUtilities(options = {}) {
  const removeClassesOption = options.removeClasses === true;
  const elementsWithClass = document.querySelectorAll("[class]");

  for (let index = 0; index < elementsWithClass.length; index += 1) {
    const currentElement = elementsWithClass[index];
    const classNames = Array.from(currentElement.classList);

    applyUtilitiesToElement(currentElement, classNames, {
      removeClasses: removeClassesOption,
    });
  }
}

function onDocumentReady() {
  applyChaiUtilities({ removeClasses: false });
}

document.addEventListener("DOMContentLoaded", onDocumentReady);

window.applyChaiUtilities = applyChaiUtilities;
window.applyUtilitiesToElement = applyUtilitiesToElement;
window.parseUtilityClass = parseUtilityClass;

