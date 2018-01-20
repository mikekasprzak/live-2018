import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

export default class ViewChat extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'twitch': null,
			'mixer': null,
			'smashcast': null,
			'twitter': null,
		};
	}

	renderItem( name, text, service = 'tv' ) {
		return (
			<div class="item">
				<UIIcon src={service} /><span class="name">{name}:</span><span class="text">{text}</span>
			</div>
		);
	}

//	renderStatus( status ) {
//		return status ? <UIIcon class="on" src="checkmark" small /> : <UIIcon class="off" src="cross" small />;
//	}
	renderStatus( status, service ) {
		return <UIIcon class={status ? "" : "off"} src={service} />;
	}

	render( props, state ) {
		const TwitchStatus = this.renderStatus(state.twitch, 'twitch');
		const MixerStatus = this.renderStatus(state.mixer, 'mixer');
		const SmashcastStatus = this.renderStatus(state.smashcast, 'smashcast');
		const TwitterStatus = this.renderStatus(state.twitter, 'twitter');

		return (
			<div id="chat">
				<div class="info">
					<div><span>CHAT:</span>{TwitchStatus}{MixerStatus}{SmashcastStatus}{TwitterStatus}</div>
				</div>
				<div class="feed">
					{this.renderItem("David", "Are you my daddy?", 'twitch')}
					{this.renderItem("Chad", "...", 'mixer')}
					{this.renderItem("David", "Defiantly, the father taketh the wide moon of the fortress upon itself to puncture the weather among the ford.", 'twitch')}
					{this.renderItem("David", "*tears*", 'twitch')}
					{this.renderItem("Kerry", "...?", 'smashcast')}
					{this.renderItem("@FrubbleToof", "I was stachey #books", 'twitter')}
				</div>
				<div class="reply">
					<input type="text" /><UIButton>SEND</UIButton>
				</div>
			</div>
		);
	}
}

//					<div><span><UIIcon src="twitch" />:</span>{TwitchStatus}</div>
//					<div><span><UIIcon src="mixer" />:</span>{MixerStatus}</div>
//					<div><span><UIIcon src="smashcast" />:</span>{SmashCastStatus}</div>
//					<div><span><UIIcon src="twitter" />:</span>{TwitterStatus}</div>
