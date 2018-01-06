(function(){
	// I started with this, but I wanted it to work differently: https://gist.github.com/miohtama/1570295

	window.parseHashBang = function( aURL ) {
		aURL = aURL || window.location.href;

		var out = {};
		out.fullPath = aURL.slice(aURL.indexOf('#!')+2);
		var hbParts = out.fullPath.split('?');

		out.path = hbParts[0];
		var rawVars = hbParts[1];

		if ( rawVars ) {
			rawVars = rawVars.split('&');
			out.vars = {};

			for ( var i = 0; i < rawVars.length; i++ ) {
				var hash = rawVars[i].split('=');

				if ( hash.length > 1 ) {
					out.vars[hash[0]] = hash[1];
				}
				else {
					out.vars[hash[0]] = null;
				}
			}
		}

		return out;
	}
})();
