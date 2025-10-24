// Sabin's BOM Playground
const sabinBOM = {
  // 1. Window controls
  openSabinTab() {
    const win = window.open('https://github.com', '_blank', 'width=600,height=400');
    setTimeout(() => win.focus(), 1000);
  },

  // 2. Screen info
  getScreenInfo() {
    return {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth
    };
  },

  // 3. Location manipulation
  redirectSabin() {
    location.href = 'https://hacktoberfest.com';
  },

  reloadPage() {
    location.reload();
  },

  // 4. History navigation
  goBack() {
    if (history.length > 1) history.back();
    else console.log('No history to go back');
  },

  goForward() {
    history.forward();
  },

  // 5. Navigator info
  getBrowserInfo() {
    return {
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      cookieEnabled: navigator.cookieEnabled
    };
  },

  // 6. Popup with confirmation
  showSabinPopup() {
    const response = confirm('Sabin wants to know: Are you ready for Hacktoberfest 2025?');
    if (response) {
      alert('Great! Keep contributing!');
    } else {
      prompt('Why not? Tell Sabin:', 'I need more coffee');
    }
  }
};

// Run demos (browser only)
if (typeof window !== 'undefined') {
  console.log('BOM Screen:', sabinBOM.getScreenInfo());
  console.log('BOM Browser:', sabinBOM.getBrowserInfo());

  // Uncomment to test
  // sabinBOM.showSabinPopup();
  // sabinBOM.openSabinTab();
  // sabinBOM.goBack();
}