const UpdateViewCount = (tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url && tab.url !== '') {
      chrome.history.getVisits({ url: tab.url }, (visitItems) => {
        chrome.browserAction.setBadgeText({
          tabId: tab.id,
          text: visitItems.length.toString()
        });
        window.visitItems = visitItems;
      });
    } else {
      console.log(tab);
      chrome.browserAction.setBadgeText({
        tabId: tab.id,
        text: '-'
      });
    }
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  UpdateViewCount(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    UpdateViewCount(tabId);
  }
});
