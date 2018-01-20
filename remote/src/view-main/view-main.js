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
		};
	}

	render( props, state ) {
		const OBSStatus = state.obs ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;
		const TwitchStatus = state.twitch ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;
		const YouTubeStatus = state.youtube ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;
		const MixerStatus = state.mixer ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;
		const SmashCastStatus = state.smashcast ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;

		return (
			<div id="main">
				<div class="info">
					<div><span><UIIcon src="obs" />:</span>{OBSStatus}</div>
					<div><span><UIIcon src="twitch" />:</span>{TwitchStatus}</div>
					<div><span><UIIcon src="youtube" />:</span>{YouTubeStatus}</div>
					<div><span><UIIcon src="mixer" />:</span>{MixerStatus}</div>
					<div><span><UIIcon src="smashcast" />:</span>{SmashCastStatus}</div>
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
