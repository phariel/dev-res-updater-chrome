$(function () {
	chrome.storage.local.get(function (result) {
		if (Object.getOwnPropertyNames(result).length > 0) {
			var siteUrl = result['siteUrl'],
				type = result['type'],
				sourceUrl = result['sourceUrl'],
				replaceUrl = result['replaceUrl'];

			var href = window.location.href;
			if (href.indexOf(siteUrl) > -1) {
				$('<button style="cursor: pointer; position: fixed; bottom: 0; right: 0; font-size: 20px; padding:10px 20px;">Update CSS</button>')
					.appendTo('body').click(function () {
						$('link').each(function () {
							var $this = $(this);
							if ($this.attr('href').indexOf(sourceUrl) > -1) {
								var baseUrl = replaceUrl.split('?')[0];
								$this.attr('href', baseUrl);
								sourceUrl = baseUrl;
							}
						});
					});
			}
		}
	});
});
