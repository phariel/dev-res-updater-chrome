var siteUrl, sourceUrl, replaceUrl;
var href = window.location.href;

$(function() {
  chrome.storage.local.get(function(result) {
    if (Object.getOwnPropertyNames(result).length > 0) {
      siteUrl = result['siteUrl'];
      sourceUrl = result['sourceUrl'];
      replaceUrl = result['replaceUrl'];

      if (href.indexOf(siteUrl) > -1) {
        $('<button class="btn-res-updater" style="transition: background-color 300ms; background: #eee; border-color: #000; color: #000; cursor: pointer; position: fixed; z-index: 9999; bottom: 20px; right: 20px; font-size: 20px; padding:10px 20px;">Update</button>')
          .appendTo('body').click(updateRes);
      }
    }
  });
});

function updateRes() {
  if (href.indexOf(siteUrl) > -1) {
    $('link').each(function() {
      var $this = $(this);
      if ($this.attr('href').indexOf(sourceUrl) > -1) {
        var baseUrl = replaceUrl.split('?')[0];
        $this.attr('href', baseUrl);
        sourceUrl = baseUrl;
        console.log('Resources Updated');

        var $btn = $('.btn-res-updater');
        $btn.css({
          'background-color': 'forestgreen',
          'color': '#fff'
        }).text('Updated');
        setTimeout(function() {
          $btn.css({
            'background-color': '#eee',
            'color': '#000'
          }).text('Update');
        }, 1000);
      }
    });
  }
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'update') {
    updateRes();
  }
});
