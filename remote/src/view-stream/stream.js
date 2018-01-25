import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

import $Twitch							from 'twitch/twitch';
import $Mixer							from 'mixer/mixer';
import $Smashcast						from 'smashcast/smashcast';

export default class ViewStream extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'twitch': null,
			'youtube': null,
			'mixer': null,
			'smashcast': null,
			'twitter': null,
			'instagram': null,
			'facebook': null,

			'twitchLive': null,
			'youtubeLive': null,
			'mixerLive': null,
			'smashcastLive': null,
		};

		this.setTitle = this.setTitle.bind(this);
		this.setGame = this.setGame.bind(this);
	}

	componentWillMount() {
		if ( CONFIG.twitchName ) {
			let Session = null;

			$Twitch.getUserByName(CONFIG.twitchName)
			.then(r => {
				if ( r && r.data && r.data.length ) {
					Session = {};
					Session.user = r.data[0];

					return $Twitch.getOldAuth();
				}
			})
			.then(r => {
				if ( r ) {
					Session.auth = r;

					return $Twitch.getOldChannelById(Session.user.id);
				}
			})
			.then(r => {
				if ( r ) {
					Session.channel = r;

					return $Twitch.getOldChannelCommunitiesById(Session.user.id);
				}
			})
			.then(r => {
				if ( r ) {
					Session.community = r.communities;
				}
			})
			.then(r => {
				this.setState({'twitch': Session});
				console.log(Session);
			});
		}

		if ( CONFIG.mixerName ) {
			let Session = null;

			$Mixer.getUserByName(CONFIG.mixerName)
			.then(r => {
				if ( r ) {
					Session = {};
					Session.user = r;

					return $Mixer.getChatsById(Session.user.id);
				}
			})
			.then(r => {
				if ( r ) {
					Session.chats = r;

//					$Mixer.chatConnect(r.endpoints[0], Session.user.id, function( event ) {
//						console.log(JSON.parse(event.data));
//					});
				}
			})
			.then(r => {
				this.setState({'mixer': Session});
				console.log(Session);
			});
		}


		if ( CONFIG.smashcastName ) {
			let Session = null;

			$Smashcast.getChats()
			.then(r => {
				if ( r ) {
					Session = {};
					Session.chats = r;

					return r;
				}
			})
			.then(r => {
				if ( r ) {
					//let server = "wss://"+Session.chats[0].server_ip;
					//let server = "wss://" + Session.chats[0].server_ip + "/socket.io/1/websocket/";

					let server = "wss://"+ Session.chats[0].server_ip +"/socket.io/?EIO=3&transport=websocket";
					let channel = 1134629;//CONFIG.smashcastName;

					$Smashcast.chatConnect(server, channel, function( event ) {
						console.log(event);
						//console.log(JSON.parse(event.data));
					});
				}
			})
			.then(r => {
				this.setState({'smashcast': Session});
				console.log(Session);
			});
		}
	}

	setTitle( text ) {
		if ( this.state.twitch ) {
			$Twitch.setOldChannelById(this.state.twitch.user.id, text);
		}
	}

	setGame( text ) {
		if ( this.state.twitch ) {
			$Twitch.setOldChannelById(this.state.twitch.user.id, null, text);
		}
	}

	renderStatus( status, service, func ) {
		return <UIButton class={status ? "on" : "off"} onClick={func}><UIIcon src={service} /></UIButton>;
	}

	render( props, state ) {
		const ServiceStatus = [
			this.renderStatus(state.twitch, 'twitch'),
			this.renderStatus(state.youtube, 'youtube'),
			this.renderStatus(state.mixer, 'mixer'),
			this.renderStatus(state.smashcast, 'smashcast'),
			this.renderStatus(state.twitter, 'twitter'),
			this.renderStatus(state.instagram, 'instagram'),
			this.renderStatus(state.facebook, 'facebook'),
		];

		const LiveStatus = [
			this.renderStatus(state.twitchLive, 'twitch'),
			this.renderStatus(state.youtubeLive, 'youtube'),
			this.renderStatus(state.mixerLive, 'mixer'),
			this.renderStatus(state.smashcastLive, 'smashcast'),
		];

		return (
			<div id="stream">
				<div class="info">
					<div><span>SERVICE:</span>{ServiceStatus}</div>
					<div><span>LIVE:</span>{LiveStatus}</div>
				</div>
				<div class="body">
					<div class="flex">
						<div id="title">
							<div class="label">Title: <UIIcon src="twitch" class={cN(state.twitch ? "on" : "off")} /> <UIIcon src="youtube" class={cN(state.youtube ? "on" : "off")} /> <UIIcon src="mixer" class={cN(state.mixer ? "on" : "off")} /> <UIIcon src="smashcast" class={cN(state.smashcast ? "on" : "off")} /></div>
							<div class="full">
								<input type="text" value={state.twitch ? state.twitch.channel.status : ''} /><UIButton onclick={this.setTitle}>SET</UIButton>
							</div>
						</div>
						<div id="game">
							<div class="label">Game: <UIIcon src="twitch" class={cN(state.twitch ? "on" : "off")} /> <UIIcon src="youtube" class={cN(state.youtube ? "on" : "off")} /> <UIIcon src="mixer" class={cN(state.mixer ? "on" : "off")} /> <UIIcon src="smashcast" class={cN(state.smashcast ? "on" : "off")} /></div>
							<div class="full">
								<input type="text" value={state.twitch ? state.twitch.channel.game : ''} /><UIButton onclick={this.setGame}>SET</UIButton>
							</div>
						</div>
					</div>
					<div class="flex">
						<div>
							<div class="label">Community: <UIIcon src="twitch" class={cN(state.twitch ? "on" : "off")} /></div>
							<div class="full">
								<input type="text" readonly value={state.twitch ? state.twitch.community[0].display_name : ""} />
							</div>
						</div>
						<div>
							<div class="label">Community: <UIIcon src="twitch" class={cN(state.twitch ? "on" : "off")} /></div>
							<div class="full">
								<input type="text" readonly value={state.twitch ? state.twitch.community[1].display_name : ""} />
							</div>
						</div>
						<div>
							<div class="label">Community: <UIIcon src="twitch" class={cN(state.twitch ? "on" : "off")} /></div>
							<div class="full">
								<input type="text" readonly value={state.twitch ? state.twitch.community[2].display_name : ""} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
