document.getElementById('downloadBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    const messageDiv = document.getElementById('message');

    if (currentUrl.includes("youtube.com/watch")) {
      
      const newUrl = currentUrl.replace("youtube.com", "ssyoutube.com");
      
      chrome.tabs.create({ url: newUrl });

    } else {
      messageDiv.textContent = "Please open a YouTube video first!";
      messageDiv.classList.remove("hidden");
    }
  });
});