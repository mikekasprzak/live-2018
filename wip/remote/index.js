
// https://github.com/haganbmj/obs-websocket-js
const obs = new OBSWebSocket();
obs.connect({address: 'localhost:4444'})
.then(r => {
	return obs.GetVersion();
})
.then(r => {
	console.log(r);
});



function parseMessage(rawMessage) {
    var parsed = {
        message: null,
        tags: null,
        command: null,
        original: rawMessage,
        channel: null,
        username: null
    };

    if(rawMessage[0] === '@'){
        var tagIndex = rawMessage.indexOf(' '),
        userIndex = rawMessage.indexOf(' ', tagIndex + 1),
        commandIndex = rawMessage.indexOf(' ', userIndex + 1),
        channelIndex = rawMessage.indexOf(' ', commandIndex + 1),
        messageIndex = rawMessage.indexOf(':', channelIndex + 1);

        parsed.tags = rawMessage.slice(0, tagIndex);
        parsed.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
        parsed.command = rawMessage.slice(userIndex + 1, commandIndex);
        parsed.channel = rawMessage.slice(commandIndex + 1, channelIndex);
        parsed.message = rawMessage.slice(messageIndex + 1);
    }

//    if(parsed.command !== 'PRIVMSG'){
//        parsed = null;
//    }

    return parsed;
}

const WS_READYSTATE_CONNECTING = 0;
const WS_READYSTATE_OPEN = 1;
const WS_READYSTATE_CLOSING = 2;
const WS_READYSTATE_CLOSED = 3;

var sock = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');
sock.onopen = function() {
	if ( (sock !== null) && (sock.readyState === WS_READYSTATE_OPEN) ) {
        console.log("Connecting and authenticating...");

        sock.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
        if ( typeof twitch_chat_password !== 'undefined' ) {
	        sock.send("PASS " + twitch_chat_password);
	        sock.send("NICK " + twitch_chat_username);
	        sock.send("JOIN #" + twitch_chat_channel);
	    }
    }
}

sock.onmessage = function( message ) {
    if ( message !== null ) {
    	console.log(message.data);
//        var parsed = parseMessage(message.data);
//    	console.log(parsed);

//        if ( parsed !== null ) {
//            userPoints = localStorage.getItem(parsed.username);
//
//            if(userPoints === null){
//                localStorage.setItem(parsed.username, 10);
//            }
//            else {
//                localStorage.setItem(parsed.username, parseFloat(userPoints) + 0.25);
//            }
//        }
    }
};



//var sock = new WebSocket("ws://localhost:4444");
//function send( data ) {
//	sock.send(JSON.stringify(data));
//}
//
//
//sock.addEventListener('open', function( event ) {
//	console.log( event );
//
// 	send({
//		'request-type': "GetVersion",
//		'message-id': "GetVersion",
// 	});
//});
//
//sock.onmessage = function( event ) {
//	var data = JSON.parse(event.data);
//
//	if ( data['message-id'] )
//		console.log('RESPONSE:', data['message-id'], data);
//	else
//		console.log('EVENT:', data['update-type'], data);
//
//	if ( data['message-id'] == "GetVersion" ) {
//		send({
//			'request-type': "ListProfiles",
//			'message-id': "ListProfiles",
//		});
//	}
//}


