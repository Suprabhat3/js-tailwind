const PREVIEW_BASE_CLASSES = [
  "preview-box",
  "chai-inline-block",
  "chai-w-320",
  "chai-h-140",
  "chai-p-14",
  "chai-grid",
  "chai-cols-1",
  "chai-gap-8",
  "chai-border-1",
  "chai-border-lightsteelblue",
  "chai-rounded-10",
  "chai-bg-aliceblue",
];

const OUTPUT_BASE_CLASSES = ["output", "chai-mt-12", "chai-text-14"];

function applyClassesAndConvert(element, classNames) {
  element.className = classNames.join(" ");
  if (typeof window.applyUtilitiesToElement === "function") {
    window.applyUtilitiesToElement(element, classNames, { removeClasses: false });
  }
}

function setOutput(output, type, message) {
  output.textContent = message;

  const stateClass =
    type === "success"
      ? "chai-text-green"
      : type === "error"
        ? "chai-text-crimson"
        : "chai-text-slategray";

  applyClassesAndConvert(output, [...OUTPUT_BASE_CLASSES, stateClass]);
}


function normalizeClassInput(rawValue) {
  return rawValue
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function initializePlayground() {
  const classInput = document.getElementById("classInput");
  const runButton = document.getElementById("runButton");
  const resetButton = document.getElementById("resetButton");
  const previewBox = document.getElementById("previewBox");
  const output = document.getElementById("output");
  const chips = document.querySelectorAll("[data-class]");

  if (!classInput || !runButton || !resetButton || !previewBox || !output) {
    return;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const utilityClass = chip.getAttribute("data-class");
      if (!utilityClass) {
        return;
      }

      const current = normalizeClassInput(classInput.value);
      if (current.includes(utilityClass)) {
        return;
      }

      current.push(utilityClass);
      classInput.value = current.join(" ");
    });
  });

  runButton.addEventListener("click", () => {
    const classes = normalizeClassInput(classInput.value);

    previewBox.className = PREVIEW_BASE_CLASSES.join(" ");
    previewBox.style.cssText = "";
    if (typeof window.applyUtilitiesToElement === "function") {
      window.applyUtilitiesToElement(previewBox, PREVIEW_BASE_CLASSES, { removeClasses: false });
    }

    classes.forEach((className) => {
      if (className.startsWith("chai-")) {
        previewBox.classList.add(className);
      }
    });

    if (typeof window.applyUtilitiesToElement !== "function") {
      setOutput(output, "error", "Engine not loaded. Make sure style.js is loaded first.");
      return;
    }

    const unsupported = window.applyUtilitiesToElement(previewBox, classes, {
      removeClasses: false,
    });

    if (unsupported.length > 0) {
      alert(`Unsupported classes currently:\n${unsupported.join("\n")}`);
      setOutput(output, "error", `Unsupported: ${unsupported.join(", ")}`);
      return;
    }

    setOutput(output, "success", "All classes converted successfully.");
  });

  resetButton.addEventListener("click", () => {
    classInput.value = "";
    previewBox.className = PREVIEW_BASE_CLASSES.join(" ");
    previewBox.style.cssText = "";
    if (typeof window.applyUtilitiesToElement === "function") {
      window.applyUtilitiesToElement(previewBox, PREVIEW_BASE_CLASSES, { removeClasses: false });
    }
    setOutput(output, "neutral", "Reset complete. Add classes and click Run.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializePlayground();
});

