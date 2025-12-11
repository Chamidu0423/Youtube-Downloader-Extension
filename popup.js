const translations = {
  en: {
    desc: "Select your preferred downloader:",
    btn: "DOWNLOAD VIDEO",
    btnNoVideo: "No YT video on current tab",
    err: "Please open a YouTube video first!",
    footer: "Powered by Nalgeon",
    contact: "Contact Developer",
    settings: "Settings",
    language: "Language",
    enableDownload: "Enable Popup Button",
    enableInVideo: "Show Button under Video",
    downloadsDisabled: "Downloads are disabled in settings",
    activationKey: "Activation Key",
    activate: "Activate",
    invalidKey: "Invalid activation key",
    activated: "Successfully activated!",
    active: "Active"
  },
  si: {
    desc: "ඔබේ ඩවුන්ලෝඩරය තෝරන්න:",
    btn: "වීඩියෝව බාගත කරන්න",
    btnNoVideo: "මෙම ටැබයේ YouTube වීඩියෝවක් නොමැත",
    err: "කරුණාකර පළමුව YouTube වීඩියෝවක් විවෘත කරන්න!",
    footer: "Nalgeon මගින් බලගැන්වේ",
    contact: "සංවර්ධකයා අමතන්න",
    settings: "සැකසීම්",
    language: "භාෂාව",
    enableDownload: "Popup බටනය සක්‍රිය කරන්න",
    enableInVideo: "වීඩියෝව යට බටනය පෙන්වන්න",
    downloadsDisabled: "සැකසීම් වලින් බාගත කිරීම් අක්‍රිය කර ඇත",
    activationKey: "සක්‍රිය කිරීම් යතුර",
    activate: "සක්‍රිය කරන්න",
    invalidKey: "වලංගු නොවන සක්‍රිය කිරීම් යතුර",
    activated: "සාර්ථකව සක්‍රිය කරන ලදී!",
    active: "සක්‍රියයි"
  },
  ta: {
    desc: "பதிவிறக்கியைத் தேர்ந்தெடுக்கவும்:",
    btn: "வீடியோவைப் பதிவிறக்கு",
    err: "முதலில் YouTube வீடியோவைத் திறக்கவும்!",
    footer: "Nalgeon ஆல் இயக்கப்படுகிறது",
    contact: "டெவலப்பரை தொடர்பு கொள்ளவும்",
    btnNoVideo: "தற்போதைய டேபில் YouTube வீடியோ இல்லை",
    settings: "அமைப்புகள்",
    language: "மொழி",
    enableDownload: "பாப்அப் பொத்தானை இயக்கு",
    enableInVideo: "வீடியோவின் கீழ் பொத்தானைக் காட்டு",
    downloadsDisabled: "அமைப்புகளில் பதிவிறக்கங்கள் முடக்கப்பட்டுள்ளன",
    activationKey: "செயல்படுத்தும் விசை",
    activate: "செயல்படுத்து",
    invalidKey: "தவறான செயல்படுத்தும் விசை",
    activated: "வெற்றிகரமாக செயல்படுத்தப்பட்டது!",
    active: "செயலில்"
  }
};

const descText = document.getElementById('descText');
const downloadBtn = document.getElementById('downloadBtn');
const footerText = document.getElementById('footerText');
const messageDiv = document.getElementById('message');
const contactLink = document.getElementById('contactLink');
const settingsBtn = document.getElementById('settingsBtn');
const backBtn = document.getElementById('backBtn');
const mainScreen = document.getElementById('mainScreen');
const settingsScreen = document.getElementById('settingsScreen');
const settingsLangSelect = document.getElementById('settingsLangSelect');
const settingsTitle = document.querySelector('.settings-header h2');
const languageLabel = document.querySelector('.setting-label');

const enableDownloadToggle = document.getElementById('enableDownloadToggle');
const enableDownloadLabel = document.querySelector('label[for="enableDownloadToggle"]');
const showInVideoToggle = document.getElementById('showInVideoToggle');
const showInVideoLabel = document.querySelector('label[for="showInVideoToggle"]');

const activationKeyInput = document.getElementById('activationKey');
const activateBtn = document.getElementById('activateBtn');
const activationLabel = document.getElementById('activationLabel');
const activatedAnimation = document.getElementById('activatedAnimation');
const activationControls = document.getElementById('activationControls');
const activationError = document.getElementById('activationError');
const getKeyLink = document.getElementById('getKeyLink');

let currentLang = 'en';
let downloadEnabled = false;
let showInVideo = false;
let isActivated = false;

function loadSettings() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['language', 'downloadEnabled', 'showInVideoButton', 'isActivated'], (result) => {
      if (result.language) currentLang = result.language;
      if (typeof result.downloadEnabled !== 'undefined') downloadEnabled = result.downloadEnabled;
      if (typeof result.showInVideoButton !== 'undefined') showInVideo = result.showInVideoButton;
      if (typeof result.isActivated !== 'undefined') isActivated = result.isActivated;
      
      settingsLangSelect.value = currentLang;
      enableDownloadToggle.checked = downloadEnabled;
      showInVideoToggle.checked = showInVideo;

      if (isActivated) {
        enableDownloadToggle.disabled = false;
        showInVideoToggle.disabled = false;
        activationControls.style.display = 'none';
        if (activatedAnimation) activatedAnimation.style.display = 'inline-block';
        activationLabel.textContent = translations[currentLang].active || 'Active';
        updateGetKeyLink();
      } else {
        enableDownloadToggle.disabled = true;
        showInVideoToggle.disabled = true;
      }
      setLanguageStrings();
      updateDownloadButtonState();
      updateGetKeyLink();
    });
  } else {
    setLanguageStrings();
    updateDownloadButtonState();
    updateGetKeyLink();
  }
}

function saveSettings() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({
      language: currentLang,
      downloadEnabled: downloadEnabled,
      showInVideoButton: showInVideo,
      isActivated: isActivated
    });
  }
}

const setLanguageStrings = () => {
  const lang = currentLang;
  const t = translations[lang];

  descText.textContent = t.desc;
  downloadBtn.textContent = t.btn;
  footerText.textContent = t.footer;
  contactLink.textContent = t.contact || 'Contact Developer';
  contactLink.href = 'https://chamidu-dilshaninfo.web.app/';

  if (settingsTitle) settingsTitle.textContent = t.settings;
  if (languageLabel) languageLabel.textContent = t.language;
  
  if (enableDownloadLabel) enableDownloadLabel.textContent = t.enableDownload;
  if (showInVideoLabel) showInVideoLabel.textContent = t.enableInVideo;

  if (activationKeyInput && activationKeyInput.placeholder) activationKeyInput.placeholder = t.activationKey;
  if (activateBtn) activateBtn.textContent = t.activate;
  if (activationLabel && !isActivated) activationLabel.textContent = t.activationKey;

  if (!messageDiv.classList.contains('hidden') && (messageDiv.textContent === translations['en'].err || messageDiv.textContent === translations['si'].err || messageDiv.textContent === translations['ta'].err)) {
    messageDiv.textContent = t.err;
  }
};

settingsBtn.addEventListener('click', () => {
  mainScreen.classList.add('hidden');
  settingsScreen.classList.remove('hidden');
  settingsLangSelect.value = currentLang;
});

backBtn.addEventListener('click', () => {
  settingsScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
});

settingsLangSelect.addEventListener('change', () => {
  currentLang = settingsLangSelect.value;
  setLanguageStrings();
  updateDownloadButtonState();
  saveSettings();
});

enableDownloadToggle.addEventListener('change', () => {
  downloadEnabled = enableDownloadToggle.checked;
  updateDownloadButtonState();
  saveSettings();
});

showInVideoToggle.addEventListener('change', () => {
  showInVideo = showInVideoToggle.checked;
  saveSettings();
});

const showActivationError = (text) => {
  if (!activationError) return;
  activationError.textContent = text;
  activationError.classList.remove('hidden');
};

const hideActivationError = () => {
  if (!activationError) return;
  activationError.classList.add('hidden');
};

const updateGetKeyLink = () => {
  if (!getKeyLink) return;
  if (isActivated) {
    getKeyLink.classList.add('hidden');
    getKeyLink.style.display = 'none';
  } else {
    getKeyLink.classList.remove('hidden');
    getKeyLink.style.display = '';
  }
};

activationKeyInput.addEventListener('input', () => {
  hideActivationError();
});

activateBtn.addEventListener('click', () => {
  const enteredKey = activationKeyInput.value.trim();
  const activationPrefix = 'NLG-YTDX-EXT2-';
  const validActivation = new RegExp(`^${activationPrefix}[0-9A-Za-z]{4}$`);
  
  if (validActivation.test(enteredKey)) {
    hideActivationError();
    isActivated = true;
    enableDownloadToggle.disabled = false;
    showInVideoToggle.disabled = false;
    activationControls.style.display = 'none';
    if (activatedAnimation) activatedAnimation.style.display = 'inline-block';
    activationLabel.textContent = translations[currentLang].active || 'Active';
    updateGetKeyLink();
      saveSettings();
    
    messageDiv.textContent = translations[currentLang].activated;
    messageDiv.classList.remove('hidden');
    messageDiv.style.background = 'rgba(59, 255, 59, 0.1)';
    messageDiv.style.color = '#6bff6b';
    messageDiv.style.border = '1px solid rgba(59, 255, 59, 0.2)';
    
    setTimeout(() => {
      messageDiv.classList.add('hidden');
    }, 3000);
  } else {
    showActivationError(translations[currentLang].invalidKey);
    messageDiv.textContent = translations[currentLang].invalidKey;
    messageDiv.classList.remove('hidden');
    messageDiv.style.background = 'rgba(255, 59, 59, 0.1)';
    messageDiv.style.color = '#ff6b6b';
    messageDiv.style.border = '1px solid rgba(255, 59, 59, 0.2)';
    
    setTimeout(() => {
      messageDiv.classList.add('hidden');
    }, 3000);
  }
});

loadSettings();

let isYTVideoOnTab = false;

function isYouTubeVideo(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.host.toLowerCase();
    const pathname = u.pathname.toLowerCase();
    if (host.includes('youtube.com')) {
      if (pathname.startsWith('/watch') || pathname.startsWith('/shorts') || pathname.startsWith('/embed')) return true;
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
  const lang = currentLang;
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
      
      const shouldDisable = !isYTVideoOnTab || !downloadEnabled;
      
      if (shouldDisable) {
        if (!downloadEnabled) {
          downloadBtn.textContent = translations[lang].downloadsDisabled;
        } else {
          downloadBtn.textContent = t.btnNoVideo || 'No YT video on current tab';
        }
        downloadBtn.classList.add('disabled');
        downloadBtn.setAttribute('disabled', 'disabled');
        messageDiv.classList.add('hidden');
      } else {
        downloadBtn.textContent = t.btn;
        downloadBtn.classList.remove('disabled');
        downloadBtn.removeAttribute('disabled');
      }
    });
  }
}

updateDownloadButtonState();

downloadBtn.addEventListener('click', () => {
  const currentLangValue = currentLang;
  if (!downloadEnabled) {
    messageDiv.textContent = translations[currentLangValue].downloadsDisabled;
    messageDiv.classList.remove('hidden');
    return;
  }
  if (!isYTVideoOnTab) {
    messageDiv.textContent = translations[currentLangValue].err;
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