const translations = {
  en: {
    desc: "Select your preferred downloader:",
    btn: "DOWNLOAD VIDEO",
    btnNoVideo: "No YT video on current tab",
    err: "Please open a YouTube video first!",
    footer: "Powered by Nalgeon",
    contact: "Contact Developer"
  },
  si: {
    desc: "ඔබේ ඩවුන්ලෝඩරය තෝරන්න:",
    btn: "වීඩියෝව බාගත කරන්න",
    btnNoVideo: "මෙම ටැබයේ YouTube වීඩියෝවක් නොමැත",
    err: "කරුණාකර පළමුව YouTube වීඩියෝවක් විවෘත කරන්න!",
    footer: "Nalgeon මගින් බලගැන්වේ",
    contact: "සංවර්ධකයා අමතන්න"
  },
  ta: {
    desc: "பதிவிறக்கியைத் தேர்ந்தெடுக்கவும்:",
    btn: "வீடியோவைப் பதிவிறக்கு",
    err: "முதலில் YouTube வீடியோவைத் திறக்கவும்!",
    footer: "Nalgeon ஆல் இயக்கப்படுகிறது"
    ,
    contact: "டெவலப்பரை தொடர்பு கொள்ளவும்"
    ,
    btnNoVideo: "தற்போதைய டேபில் YouTube வீடியோ இல்லை"
  }
};

const langSelect = document.getElementById('langSelect');
const descText = document.getElementById('descText');
const downloadBtn = document.getElementById('downloadBtn');
const footerText = document.getElementById('footerText');
const messageDiv = document.getElementById('message');
const contactLink = document.getElementById('contactLink');

const setLanguageStrings = () => {
  const lang = langSelect.value;
  const t = translations[lang];

  descText.textContent = t.desc;
  downloadBtn.textContent = t.btn;
  footerText.textContent = t.footer;
  contactLink.textContent = t.contact || 'Contact Developer';
  contactLink.href = 'https://chamidu-dilshaninfo.web.app/';

  if (!messageDiv.classList.contains('hidden')) {
    messageDiv.textContent = t.err;
  }
};

langSelect.addEventListener('change', setLanguageStrings);

setLanguageStrings();

let isYTVideoOnTab = false;

function isYouTubeVideo(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.host.toLowerCase();
    const pathname = u.pathname.toLowerCase();
    if (host.includes('youtube.com')) {
      if (pathname.startsWith('/watch') || pathname.startsWith('/shorts') || pathname.startsWith('/embed')) return true;      // sometimes the query has v= param
      if (u.searchParams && u.searchParams.get('v')) return true;
    }
    if (host === 'youtu.be') {
      if (pathname.length > 1) return true;
    }
  } catch(e) {
    return false;
  }
  return false;
}

function updateDownloadButtonState() {
  const lang = langSelect.value;
  const t = translations[lang];
  isYTVideoOnTab = false;
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0 || !tabs[0]) {
        isYTVideoOnTab = false;
      } else {
        const url = tabs[0].url || '';
        isYTVideoOnTab = isYouTubeVideo(url);
      }
      if (!isYTVideoOnTab) {
        downloadBtn.textContent = t.btnNoVideo || 'No YT video on current tab';
        downloadBtn.classList.add('disabled');
        downloadBtn.setAttribute('disabled', 'disabled');
        messageDiv.classList.add('hidden');
      } else {
        downloadBtn.textContent = t.btn;
        downloadBtn.classList.remove('disabled');
        downloadBtn.removeAttribute('disabled');
      }
    });
  } else {
    isYTVideoOnTab = false;
    downloadBtn.textContent = t.btnNoVideo || 'No YT video on current tab';
    downloadBtn.classList.add('disabled');
    downloadBtn.setAttribute('disabled', 'disabled');
  }
}

langSelect.addEventListener('change', () => {
  setLanguageStrings();
  updateDownloadButtonState();
});

updateDownloadButtonState();

downloadBtn.addEventListener('click', () => {
  const currentLang = langSelect.value;
  if (!isYTVideoOnTab) {
    messageDiv.textContent = translations[currentLang].err;
    messageDiv.classList.remove('hidden');
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0 || !tabs[0]) return;
    const currentUrl = tabs[0].url || '';
    const service = document.getElementById('serviceSelect').value;
    try {
      const u = new URL(currentUrl);
      if (service === 'yout') u.host = u.host.replace(/youtube\.com/ig, 'yout.com');
      else if (service === 'ss') u.host = u.host.replace(/youtube\.com/ig, 'ssyoutube.com');
      else if (service === 'vd') u.host = u.host.replace(/youtube\.com/ig, 'vdyoutube.com');
      else if (u.host === 'youtu.be') {
        if (service === 'yout') u.host = 'yout.com';
        else if (service === 'ss') u.host = 'ssyoutube.com';
        else if (service === 'vd') u.host = 'vdyoutube.com';
      }
      chrome.tabs.create({ url: u.toString() });
    } catch (err) {
      let newUrl = currentUrl;
      if (service === 'yout') newUrl = currentUrl.replace('youtube.com', 'yout.com').replace('youtu.be', 'yout.com');
      else if (service === 'ss') newUrl = currentUrl.replace('youtube.com', 'ssyoutube.com').replace('youtu.be', 'ssyoutube.com');
      else if (service === 'vd') newUrl = currentUrl.replace('youtube.com', 'vdyoutube.com').replace('youtu.be', 'vdyoutube.com');
      chrome.tabs.create({ url: newUrl });
    }
  });
});