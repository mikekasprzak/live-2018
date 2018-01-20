import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

export default class ViewMain extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'obs': null,
			'twitch': null,
			'youtube': null,
			'mixer': null,
			'smashcast': null,
			'twitter': null,
			'instagram': null,
			'facebook': null,
		};
	}


//	renderStatus( status ) {
//		return status ? <UIIcon class="on" src="checkmark" small /> : <UIIcon class="off" src="cross" small />;
//	}
	renderStatus( status, service ) {
		return <UIIcon class={status ? "" : "off"} src={service} />;
	}

	render( props, state ) {
		const OBSStatus = this.renderStatus(state.obs, 'obs');
		const TwitchStatus = this.renderStatus(state.twitch, 'twitch');
		const YouTubeStatus = this.renderStatus(state.youtube, 'youtube');
		const MixerStatus = this.renderStatus(state.mixer, 'mixer');
		const SmashcastStatus = this.renderStatus(state.smashcast, 'smashcast');
		const TwitterStatus = this.renderStatus(state.twitter, 'twitter');
		const InstagramStatus = this.renderStatus(state.instagram, 'instagram');
		const FacebookStatus = this.renderStatus(state.facebook, 'facebook');

		return (
			<div id="main">
				<div class="info">
					<div><span>SERVICE:</span>{OBSStatus}{TwitchStatus}{YouTubeStatus}{MixerStatus}{SmashcastStatus}{TwitterStatus}{InstagramStatus}{FacebookStatus}</div>
					<div><span>STREAM:</span>{(state.obs && state.obs.streaming) ? <span class="live">LIVE</span> : <span>OFFLINE</span>}</div>
					<div><span>RECORD:</span>{(state.obs && state.obs.recording) ? <span class="live">YES</span> : <span>NO</span>}</div>
				</div>
				<div class="body">
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
