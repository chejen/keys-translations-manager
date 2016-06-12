module.exports = {
	findMergeable: function(translations, locales) {
		if (!translations || !locales) {
			return {
				keys: {},
				mergeable: []
			};
		}

		var translation,
			l = translations.length,
			lenLocales = locales.length,
			keyHash = {},
			keyCollision,
			translationHash,
			translationCollision,
			translationSet,
			keys = {},
			mergeable = [];

		while(l--){
			translation = translations[l];
			keyCollision = keyHash[translation.key];
			if (keyCollision) {
				keyCollision.push(translation);
			} else {
				keyHash[translation.key] = [translation];
			}
		}

		for (var key in keyHash) {
			keyCollision = keyHash[key];
			if (keyCollision.length >= 2) {
				translationHash = {};
				for (var j=0, kc; j < keyCollision.length; j++) {
					translationSet = "";
					kc = keyCollision[j];
					
					for (var i=0; i < lenLocales; i++) {
						translationSet += (kc[ locales[i] ] ? kc[ locales[i] ] : "");
					}

					translationCollision = translationHash[translationSet];
					if (translationCollision) {
						translationCollision.push(kc);
					} else {
						translationHash[translationSet] = [kc];
					}
				}
				
				for (var innerKey in translationHash) {
					if (translationHash[innerKey].length >= 2) {
						keys[key] = true;
						mergeable.push(translationHash[innerKey]);
					}
				}
			}
		}

		return {
			keys: keys,
			mergeable: mergeable
		};
	}
}
