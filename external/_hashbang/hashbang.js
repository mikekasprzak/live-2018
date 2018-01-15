(function(){
	// I started with this, but I wanted it to work differently: https://gist.github.com/miohtama/1570295

	window.parseHashBang = function( aURL ) {
		aURL = aURL || window.location.href;

		var out = {};
		out.href = aURL;
		out.ref = aURL.slice(aURL.indexOf('#!')+2);
		var hbParts = out.ref.split('?');

		out.pathname = hbParts[0];
//		if ( out.pathname.indexOf('/') !== 0 )
		if ( out.pathname[0] === '/' )
			out.path = out.pathname.slice(1).split('/');
		else
			out.path = out.pathname.split('/');

		var rawArgs = hbParts[1];
		if ( rawArgs ) {
			out.query = rawArgs;
			rawArgs = rawArgs.split('&');
			out.arg = {};

			for ( var i = 0; i < rawArgs.length; i++ ) {
				var hash = rawArgs[i].split('=');

				if ( hash.length > 1 ) {
					out.arg[hash[0]] = hash[1];
				}
				else {
					out.arg[hash[0]] = null;
				}
			}
		}

		return out;
	}
})();
