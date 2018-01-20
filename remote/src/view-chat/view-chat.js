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

	twitchConnect() {
		console.log('t');
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
	renderStatus( status, service, func ) {
		return <UIButton class={status ? "on" : "off"} onClick={func}><UIIcon src={service} /></UIButton>;
	}

	render( props, state ) {
		const ChatStatus = [
			this.renderStatus(state.twitch, 'twitch', this.twitchConnect),
			this.renderStatus(state.mixer, 'mixer'),
			this.renderStatus(state.smashcast, 'smashcast'),
			this.renderStatus(state.twitter, 'twitter'),
		];

		return (
			<div id="chat">
				<div class="info">
					<div><span>CHAT:</span>{ChatStatus}</div>
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
