let isInjecting = false;

function injectDownloadButton() {
    const buttonsContainer = document.querySelector('#top-level-buttons-computed');
    if (!buttonsContainer) return;

    if (buttonsContainer.querySelector('#nalgeon-download-btn')) return;

    if (isInjecting) return;
    isInjecting = true;

    chrome.storage.local.get(['isActivated', 'showInVideoButton'], (result) => {
        isInjecting = false;

        if (buttonsContainer.querySelector('#nalgeon-download-btn')) return;
        if (!result.isActivated || !result.showInVideoButton) return;

        const newBtn = document.createElement('a');
        newBtn.id = 'nalgeon-download-btn';
        newBtn.innerHTML = `
            <svg height="24" viewBox="0 0 24 24" width="24">
                <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
            </svg>
            <span style="margin-left: 6px;">Download</span>
        `;
        
        newBtn.style.display = 'inline-flex';
        newBtn.style.alignItems = 'center';
        newBtn.style.justifyContent = 'center';
        newBtn.style.cursor = 'pointer';
        newBtn.style.textDecoration = 'none';
        newBtn.style.color = 'var(--yt-spec-text-primary)';
        newBtn.style.fontSize = '14px';
        newBtn.style.fontWeight = '500';
        newBtn.style.padding = '0 16px';
        newBtn.style.height = '36px';
        newBtn.style.borderRadius = '18px';
        newBtn.style.backgroundColor = 'rgba(0,0,0,0.05)';
        newBtn.style.marginLeft = '8px';
        newBtn.style.border = 'none';

        if (document.documentElement.getAttribute('dark') === 'true') {
            newBtn.style.backgroundColor = 'rgba(255,255,255,0.1)';
            newBtn.style.color = '#f1f1f1';
        }

        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentVideoUrl = window.location.href;
            const newUrl = currentVideoUrl.replace('youtube.com', 'yout.com').replace('youtu.be', 'yout.com');
            window.open(newUrl, '_blank');
        });

        buttonsContainer.appendChild(newBtn);

        setTimeout(() => {
            const btnRect = newBtn.getBoundingClientRect();
            
            if (btnRect.width === 0 || btnRect.height === 0) return;

            const gifImage = document.createElement('img');
            gifImage.src = chrome.runtime.getURL('banner-tooltip.gif');
            gifImage.className = 'nalgeon-floating-gif';

            const absoluteTop = btnRect.top + window.scrollY - 25; 
            
            const absoluteLeft = btnRect.left + window.scrollX + (btnRect.width / 2) + 5;

            gifImage.style.top = `${absoluteTop}px`;
            gifImage.style.left = `${absoluteLeft}px`;

            document.body.appendChild(gifImage);

            setTimeout(() => {
                if (gifImage && gifImage.parentNode) {
                    gifImage.parentNode.removeChild(gifImage);
                }
            }, 2500);

        }, 100);
    });
}

const observer = new MutationObserver(() => {
    injectDownloadButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectDownloadButton();