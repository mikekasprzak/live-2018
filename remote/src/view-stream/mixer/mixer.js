
export default {
	getUserIdByName,
	getUserByName,

	getChatsById,

	chatConnect,
};

const API = "https://mixer.com/api/v1";
const API_GET = {'method': "GET"};

function getUserIdByName( name ) {
	return fetch(API+"/channels/"+name+"?fields=id", API_GET)
		.then(r => r.json());
}

function getUserByName( name ) {
	return fetch(API+"/channels/"+name, API_GET)
		.then(r => r.json());
}

function getChatsById( id ) {
	return fetch(API+"/chats/"+id, API_GET)
		.then(r => r.json());
}


function chatConnect( server, id, func ) {
	var socket = new WebSocket(server);

	socket.addEventListener('open', function( event ) {
		socket.send(JSON.stringify({
			"type": "method",
			"method": "auth",
			"arguments": [
				id
			],
			"id": 0,
		}));
	});

	socket.addEventListener('message', func);

	return socket;
}
