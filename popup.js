const translations = {
  en: {
    desc: "Select your preferred downloader:",
    btn: "DOWNLOAD VIDEO",
    err: "Please open a YouTube video first!",
    footer: "Powered by Nalgeon"
  },
  si: {
    desc: "ඔබේ ඩවුන්ලෝඩරය තෝරන්න:",
    btn: "වීඩියෝව බාගත කරන්න",
    err: "කරුණාකර පළමුව YouTube වීඩියෝවක් විවෘත කරන්න!",
    footer: "Nalgeon මගින් බලගැන්වේ"
  },
  ta: {
    desc: "பதிவிறக்கியைத் தேர்ந்தெடுக்கவும்:",
    btn: "வீடியோவைப் பதிவிறக்கு",
    err: "முதலில் YouTube வீடியோவைத் திறக்கவும்!",
    footer: "Nalgeon ஆல் இயக்கப்படுகிறது"
  }
};

const langSelect = document.getElementById('langSelect');
const descText = document.getElementById('descText');
const downloadBtn = document.getElementById('downloadBtn');
const footerText = document.getElementById('footerText');
const messageDiv = document.getElementById('message');

langSelect.addEventListener('change', () => {
  const lang = langSelect.value;
  const t = translations[lang];

  descText.textContent = t.desc;
  downloadBtn.textContent = t.btn;
  footerText.textContent = t.footer;
  
  if (!messageDiv.classList.contains('hidden')) {
    messageDiv.textContent = t.err;
  }
});

downloadBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    const service = document.getElementById('serviceSelect').value;
    const currentLang = langSelect.value;

    if (currentUrl.includes("youtube.com/watch")) {
      let newUrl = currentUrl;
      if (service === "yout") newUrl = currentUrl.replace("youtube.com", "yout.com");
      else if (service === "ss") newUrl = currentUrl.replace("youtube.com", "ssyoutube.com");
      else if (service === "vd") newUrl = currentUrl.replace("youtube.com", "vdyoutube.com");
      
      chrome.tabs.create({ url: newUrl });
    } else {
      messageDiv.textContent = translations[currentLang].err;
      messageDiv.classList.remove("hidden");
    }
  });
});