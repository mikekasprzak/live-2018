
export default {
	FetchUserByName,
};

const OLDAPI = "https://api.twitch.tv/kraken";
const NEWAPI = "https://api.twitch.tv/helix";

const HEADERS = {'Client-ID': CONFIG.twitchAppClientId};

const OLDAPI_HEADERS = new Headers(Object.assign({'Accept': "application/vnd.twitchtv.v5+json"}, HEADERS));
const NEWAPI_HEADERS = new Headers(HEADERS);

const OLDAPI_GET = {'method': "GET", 'headers': OLDAPI_HEADERS};
const NEWAPI_GET = {'method': "GET", 'headers': NEWAPI_HEADERS};
function OLDAPI_POST( data ) {
	return {'method': "POST", 'headers': OLDAPI_HEADERS, 'data': data};
}
function NEWAPI_POST( data ) {
	return {'method': "POST", 'headers': NEWAPI_HEADERS, 'data': data};
}


function FetchUserByName( users ) {
	if ( !Array.isArray(users) ) {
		users = [users];
	}

	return fetch(NEWAPI+"/users?"+users.map((el) => ("login="+el)).join("&"), NEWAPI_GET)
		.then(r => r.json());
}

