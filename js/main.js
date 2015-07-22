$(function() {
  var $siteUrl = $('.url-site'),
    $main = $('.main'),
    $sourceUrl = $('.url-source'),
    $replaceUrl = $('.url-replace'),
    $type = $('.type-select'),
    $save = $('.btn-save'),
    $clean = $('.btn-clean'),
    $input = $('.data-input');

  var PROP_SITE_URL = 'siteUrl',
    PROP_SOURCE_URL = 'sourceUrl',
    PROP_REPLACE_URL = 'replaceUrl';

  var st = window.localStorage;

  function ani(type) {
    $main.addClass(type ? 'done' : 'error');
    setTimeout(function() {
      $main.removeClass(type ? 'done' : 'error');
    }, 1000);
  }

  chrome.storage.local.get(function(result) {
    if (Object.getOwnPropertyNames(result).length > 0) {
      $siteUrl.val(result[PROP_SITE_URL]);
      $sourceUrl.val(result[PROP_SOURCE_URL]);
      $replaceUrl.val(result[PROP_REPLACE_URL]);
    }
  });

  function save() {
    var siteVal = $siteUrl.val(),
      sourceVal = $sourceUrl.val(),
      replaceVal = $replaceUrl.val(),
      typeVal = $type.val();
    if (siteVal.length === 0 && sourceVal.length === 0 && replaceVal.length === 0) {
      ani(0);
    } else {
      var obj = {
        type: typeVal
      };
      siteVal.length > 0 && (obj[PROP_SITE_URL] = siteVal);
      sourceVal.length > 0 && (obj[PROP_SOURCE_URL] = sourceVal);
      replaceVal.length > 0 && (obj[PROP_REPLACE_URL] = replaceVal);
      chrome.storage.local.set(obj, function() {
        ani(1);
      });
    }
  };

  $clean.on('click', function() {
    chrome.storage.local.clear(function() {
      $siteUrl.val('');
      $sourceUrl.val('');
      $replaceUrl.val('');
      ani(1);
    });
  });

  $input.on('keypress', function(e) {
    e.keyCode === 13 && $(e.currentTarget).blur();
  });

  $input.on('blur', function() {
    save();
  });

});
