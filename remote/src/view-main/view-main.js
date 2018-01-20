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
			'facebook': null,
			'instagram': null,
		};
	}


	renderStatus( status ) {
		return status ? <UIIcon class="on" src="checkmark" small /> : <UIIcon class="off" src="cross" small />;
	}

	render( props, state ) {
		const OBSStatus = this.renderStatus(state.obs);
		const TwitchStatus = this.renderStatus(state.twitch);
		const YouTubeStatus = this.renderStatus(state.youtube);
		const MixerStatus = this.renderStatus(state.mixer);
		const SmashCastStatus = this.renderStatus(state.smashcast);
		const TwitterStatus = this.renderStatus(state.twitter);
		const FacebookStatus = this.renderStatus(state.facebook);
		const InstagramStatus = this.renderStatus(state.instagram);

		return (
			<div id="main">
				<div class="info">
					<div><span><UIIcon src="obs" />:</span>{OBSStatus}</div>
					<div><span><UIIcon src="twitch" />:</span>{TwitchStatus}</div>
					<div><span><UIIcon src="youtube" />:</span>{YouTubeStatus}</div>
					<div><span><UIIcon src="mixer" />:</span>{MixerStatus}</div>
					<div><span><UIIcon src="smashcast" />:</span>{SmashCastStatus}</div>
					<div><span><UIIcon src="twitter" />:</span>{TwitterStatus}</div>
					<div><span><UIIcon src="facebook" />:</span>{FacebookStatus}</div>
					<div><span><UIIcon src="instagram" />:</span>{InstagramStatus}</div>
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
