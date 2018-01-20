import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

export default class ViewMain extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'obs': null,
			'obsVersion': null,
			'obsInfo': null,

			'twitch': null,
			'youtube': null,
			'mixer': null,
			'smashcast': null,
			'twitter': null,
			'instagram': null,
			'facebook': null,
		};

		this.obsHeartbeatEvent = this.obsHeartbeatEvent.bind(this);
		this.obsStatusEvent = this.obsStatusEvent.bind(this);
	}

	componentWillMount() {
		var OBS = new OBSWebSocket();
		OBS.onStreamStatus(this.obsStatusEvent);
		OBS.onHeartbeat(this.obsHeartbeatEvent);
		OBS.onConnectionOpened(e => {
			OBS.SetHeartbeat({'enable': true});
			OBS.GetVersion()
				.then(r => {
					this.setState({
						'obsVersion': {
							'version': r.obsStudioVersion,
							'pluginVersion': r.obsWebsocketVersion
						}
					});
				});
//			OBS.GetStreamingStatus()
//				.then(r => {
//					this.setState({'obsInfo': r});
//				});
		});
//		OBS.onConnectionClosed(e => {
//			// TODO: Improve this
//			this.setState({'obs': null});
//		});

		OBS.connect({address: 'localhost:4444'})
		.then(r => {
			this.setState({'obs': OBS});
		});
	}

	obsStatusEvent( e ) {
		console.log(e);
	}
	obsHeartbeatEvent( e ) {
		//console.log(e);
		this.setState({'obsInfo': e});
	}

	renderStatus( status, service ) {
		return <UIIcon class={status ? "on" : "off"} src={service} />;
	}

	render( props, state ) {
		const OBSStatus = this.renderStatus(state.obs, 'obs');
		let OBSInfo = [];
		if ( state.obsVersion ) {
			OBSInfo.push(<div><span>VERSION:</span><span class="offline">{state.obsVersion.version}</span></div>);
			OBSInfo.push(<div><span>PLUGIN:</span><span class="offline">{state.obsVersion.pluginVersion}</span></div>);
		}
		if ( state.obsInfo ) {
			OBSInfo.push(<div><span>STREAM:</span>{state.obsInfo.streaming ? <span class="live">{state.obsInfo.streamTimecode}</span> : <span class="offline">OFFLINE</span>}</div>);
			OBSInfo.push(<div><span>RECORD:</span>{state.obsInfo.recording ? <span class="live">{state.obsInfo.recTimecode}</span> : <span class="offline">NO</span>}</div>);

			//OBSInfo.push(state.obsInfo.pulse ? '.' : '');
		}

		const ServiceStatus = [
			this.renderStatus(state.twitch, 'twitch'),
			this.renderStatus(state.youtube, 'youtube'),
			this.renderStatus(state.mixer, 'mixer'),
			this.renderStatus(state.smashcast, 'smashcast'),
			this.renderStatus(state.twitter, 'twitter'),
			this.renderStatus(state.instagram, 'instagram'),
			this.renderStatus(state.facebook, 'facebook'),
		];

		return (
			<div id="main">
				<div class="info">
					<div><span>OBS:</span>{OBSStatus}</div>
					{OBSInfo}
				</div>
				<div class="body">
					Things
				</div>
				<div class="info2">
					<div><span>SERVICE:</span>{ServiceStatus}</div>
				</div>
				<div class="service">
					<div class="flex">
						<div id="title">
							<div class="label">Title: <UIIcon src="twitch" /> <UIIcon src="youtube" /> <UIIcon src="mixer" /> <UIIcon src="smashcast" /></div>
							<div class="full">
								<input type="text" /><UIButton>SET</UIButton>
							</div>
						</div>
						<div id="game">
							<div class="label">Game: <UIIcon src="twitch" /> <UIIcon src="youtube" /> <UIIcon src="mixer" /> <UIIcon src="smashcast" /></div>
							<div class="full">
								<input type="text" /><UIButton>SET</UIButton>
							</div>
						</div>
					</div>
					<div class="flex">
						<div>
							<div class="label">Community: <UIIcon src="twitch" /></div>
							<div class="full">
								<input type="text" /><UIButton>SET</UIButton>
							</div>
						</div>
						<div>
							<div class="label">Community: <UIIcon src="twitch" /></div>
							<div class="full">
								<input type="text" /><UIButton>SET</UIButton>
							</div>
						</div>
						<div>
							<div class="label">Community: <UIIcon src="twitch" /></div>
							<div class="full">
								<input type="text" /><UIButton>SET</UIButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

//					<div><span><UIIcon src="obs" />:</span>{OBSStatus}</div>
//					<div><span><UIIcon src="twitch" />:</span>{TwitchStatus}</div>
//					<div><span><UIIcon src="youtube" />:</span>{YouTubeStatus}</div>
//					<div><span><UIIcon src="mixer" />:</span>{MixerStatus}</div>
//					<div><span><UIIcon src="smashcast" />:</span>{SmashCastStatus}</div>
//					<div><span><UIIcon src="twitter" />:</span>{TwitterStatus}</div>
//					<div><span><UIIcon src="facebook" />:</span>{FacebookStatus}</div>
//					<div><span><UIIcon src="instagram" />:</span>{InstagramStatus}</div>
