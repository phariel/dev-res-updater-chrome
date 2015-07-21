$(function () {
	var $siteUrl = $('.url-site'),
		$main = $('.main'),
		$sourceUrl = $('.url-source'),
		$replaceUrl = $('.url-replace'),
		$type = $('.type-select'),
		$save = $('.btn-save'),
		$clean = $('.btn-clean');

	var PROP_SITE_URL = 'siteUrl',
		PROP_SOURCE_URL = 'sourceUrl',
		PROP_REPLACE_URL = 'replaceUrl';

	var st = window.localStorage;

	function ani(type) {
		$main.addClass(type ? 'done' : 'error');
		setTimeout(function () {
			$main.removeClass(type ? 'done' : 'error');
		}, 1000);
	}

	chrome.storage.local.get(function (result) {
		if (Object.getOwnPropertyNames(result).length > 0) {
			$siteUrl.val(result[PROP_SITE_URL]);
			$sourceUrl.val(result[PROP_SOURCE_URL]);
			$replaceUrl.val(result[PROP_REPLACE_URL]);
		}
	});

	$save.click(function () {
		var siteVal = $siteUrl.val(),
			sourceVal = $sourceUrl.val(),
			replaceVal = $replaceUrl.val(),
			typeVal = $type.val();
		if (siteVal.length > 0 && sourceVal.length > 0 && replaceVal.length > 0 && typeVal.length > 0) {
			chrome.storage.local.set({
				'siteUrl': siteVal,
				'sourceUrl': sourceVal,
				'replaceUrl': replaceVal,
				'type': typeVal
			}, function () {
				ani(1);
			});
		} else {
			ani(0);
		}
	});

	$clean.click(function () {
		chrome.storage.local.clear(function () {
			$siteUrl.val('');
			$sourceUrl.val('');
			$replaceUrl.val('');
			ani(1);
		});
	});
});