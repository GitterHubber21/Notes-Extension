let popupOpen = false;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Meeting Note Assistant installed.");
    chrome.action.setPopup({ popup: "popup.html" });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      const url = new URL(tab.url);
      const hostname = url.hostname;
      const meetingDomains = [
        'zoom.us',
        'zoom.com',
        'meet.google.com', 
        'teams.microsoft.com', 
        'webex.com'
      ].map(domain => domain.toLowerCase());
      
      console.log("Current hostname:", hostname);
      
      if (meetingDomains.some(domain => hostname.toLowerCase().includes(domain)) && !popupOpen) {
        popupOpen = true;
        chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup",
          width: 230,
          height: 230
        }, () => {
          chrome.windows.onRemoved.addListener(() => {
            popupOpen = false;
          });
        });
        console.log("Meeting link detected:", tab.url);
      }
    }
  });