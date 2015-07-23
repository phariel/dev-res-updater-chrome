chrome.commands.onCommand.addListener(function(command) {
  console.log(command);
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    if (command === 'update-res') {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "update"
      }, function(response) {});
    }
  });
});
