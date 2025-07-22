function _katexRender(rootElement) {
  const eles = rootElement.querySelectorAll(".katex-eq:not(.katex-rendered)");
  for (let idx = 0; idx < eles.length; idx++) {
    const ele = eles[idx];
    ele.classList.add("katex-rendered");
    try {
      katex.render(ele.textContent, ele, {
        displayMode: ele.getAttribute("data-katex-display") === "true",
        throwOnError: false,
      });
    } catch (n) {
      ele.style.color = "red";
      ele.textContent = n.message;
    }
  }
}

function katexRender() {
  _katexRender(document);
}

document.addEventListener("DOMContentLoaded", function () {
  katexRender();

  // Perform a KaTeX rendering step when the DOM is mutated.
  const katexObserver = new MutationObserver(function (mutations) {
    [].forEach.call(mutations, function (mutation) {
      if (mutation.target && mutation.target instanceof Element) {
        _katexRender(mutation.target);
      }
    });
  });

  const katexObservationConfig = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  };

  katexObserver.observe(document.body, katexObservationConfig);
});
