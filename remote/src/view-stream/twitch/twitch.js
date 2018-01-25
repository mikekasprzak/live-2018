
export default {
	getUserByName,

	// Calls using the old API
	getOldChannelById,
	setOldChannelById,
	getOldChannelCommunitiesById,

	getOldAuth,
};

const OLDAPI = "https://api.twitch.tv/kraken";
const NEWAPI = "https://api.twitch.tv/helix";

const HEADERS = {'Client-ID': CONFIG.twitchAppClientId};

const OLDAPI_HEADERS = new Headers(Object.assign({'Accept': "application/vnd.twitchtv.v5+json"}, HEADERS));
const NEWAPI_HEADERS = new Headers(HEADERS);
const OLDAPI_AUTH_HEADERS = new Headers(Object.assign({'Accept': "application/vnd.twitchtv.v5+json", 'Authorization': "OAuth "+CONFIG.twitchAppClientSecret}, HEADERS));

const OLDAPI_GET = {'method': "GET", 'headers': OLDAPI_HEADERS};
const NEWAPI_GET = {'method': "GET", 'headers': NEWAPI_HEADERS};
//function OLDAPI_POST( data ) {
//	return {'method': "POST", 'headers': OLDAPI_HEADERS, 'data': JSON.stringify(data)};
//}
function OLDAPI_PUT( data ) {
	return {'method': "PUT", 'headers': OLDAPI_AUTH_HEADERS, 'data': JSON.stringify(data)};
}
//function NEWAPI_POST( data ) {
//	return {'method': "POST", 'headers': NEWAPI_HEADERS, 'data': JSON.stringify(data)};
//}
function NEWAPI_PUT( data ) {
	return {'method': "PUT", 'headers': NEWAPI_HEADERS, 'data': JSON.stringify(data)};
}


function getUserByName( names ) {
	if ( !Array.isArray(names) ) {
		names = [names];
	}

	return fetch(NEWAPI+"/users?"+names.map((el) => ("login="+el)).join("&"), NEWAPI_GET)
		.then(r => r.json());
}


function getOldChannelById( id ) {
	return fetch(OLDAPI+"/channels/"+id, OLDAPI_GET)
		.then(r => r.json());
}
function setOldChannelById( id, status = null, game = null ) {
	var Data = {};

	if ( status )
		Data.status = status;
	if ( game )
		Data.game = game;

	return fetch(OLDAPI+"/channels/"+id, OLDAPI_PUT(Data))
		.then(r => r.json());
}


function getOldChannelCommunitiesById( id ) {
	return fetch(OLDAPI+"/channels/"+id+"/communities", OLDAPI_GET)
		.then(r => r.json());
}


function getOldAuth() {
	return fetch(OLDAPI, OLDAPI_GET)
		.then(r => r.json());
}
