document.getElementById("openWidget").addEventListener("click", () => {
  chrome.windows.create({
    url: chrome.runtime.getURL("widget.html"),
    type: "popup",
    width: 360,
    height: 620,
  });
  window.close();
});
