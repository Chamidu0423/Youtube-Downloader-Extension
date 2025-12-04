document.getElementById('downloadBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    const messageDiv = document.getElementById('message');
    const service = document.getElementById('serviceSelect').value;

    if (currentUrl.includes("youtube.com/watch")) {
      
      let newUrl = currentUrl;

      if (service === "yout") {
        newUrl = currentUrl.replace("youtube.com", "yout.com"); 
      } else if (service === "ss") {
        newUrl = currentUrl.replace("youtube.com", "ssyoutube.com");
      } else if (service === "vd") {
        newUrl = currentUrl.replace("youtube.com", "vdyoutube.com");
      }
      
      chrome.tabs.create({ url: newUrl });

    } else {
      messageDiv.textContent = "Please open a YouTube video first!";
      messageDiv.classList.remove("hidden");
    }
  });
});