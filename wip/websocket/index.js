
const WS_READYSTATE_CONNECTING = 0;
const WS_READYSTATE_OPEN = 1;
const WS_READYSTATE_CLOSING = 2;
const WS_READYSTATE_CLOSED = 3;


var sock = new WebSocket("ws://localhost:4444");
function send( data ) {
	sock.send(JSON.stringify(data));
}


sock.addEventListener('open', function( event ) {
	console.log( event );

 	send({
		'request-type': "GetVersion",
		'message-id': "GetVersion",
 	});
});

sock.onmessage = function( event ) {
	var data = JSON.parse(event.data);

	if ( data['message-id'] )
		console.log('RESPONSE:', data['message-id'], data);
	else
		console.log('EVENT:', data['update-type'], data);

	if ( data['message-id'] == "GetVersion" ) {
		send({
			'request-type': "ListProfiles",
			'message-id': "ListProfiles",
		});
	}
}


