
export default {
//	getUserIdByName,
//	getUserByName,

	getChats,

	chatConnect,
};

const API = "https://api.smashcast.tv/";
const API_GET = {'method': "GET"};
//
//function getUserIdByName( name ) {
//	return fetch(API+"/channels/"+name+"?fields=id", API_GET)
//		.then(r => r.json());
//}
//
//function getUserByName( name ) {
//	return fetch(API+"/channels/"+name, API_GET)
//		.then(r => r.json());
//}

function getChats() {
	return fetch(API+"/chat/servers/", API_GET)
		.then(r => r.json());
}


// http://developers.hitbox.tv/#login-command

// https://github.com/socketio/socket.io-protocol

// "wss://"+ Session.chats[0].server_ip +"/socket.io/?EIO=3&transport=websocket";

function chatConnect( server, channel, func ) {
	var socket = new WebSocket(server);
	console.log("connecting to", server, "...");

	socket.addEventListener('open', function( event ) {
		console.log("connected to", server);

		socket.send('0'+JSON.stringify({
			"method": "joinChannel",
			"params": {
				"channel": channel,
				"name": "UnknownSoldier",	// i.e. anonymous
				"token": null,				// i.e. anonymous
				"hideBuffered": false,
			},
			"id": 0,
		}));
	});

	socket.addEventListener('message', func);

	return socket;
}
