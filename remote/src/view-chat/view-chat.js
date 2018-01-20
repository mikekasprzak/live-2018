import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

export default class ViewChat extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'twitch': null,
		};
	}

	renderItem( name, text, service = 'tv' ) {
		return (
			<div class="item">
				<UIIcon src={service} /><span class="name">{name}:</span><span class="text">{text}</span>
			</div>
		);
	}

	render( props, state ) {
		const TwitchStatus = state.twitch ? <UIIcon class="on" src="checkmark" /> : <UIIcon class="off" src="cross" />;

		return (
			<div id="chat">
				<div class="info">
					<div><UIIcon src="twitch" /><span>:</span>{TwitchStatus}</div>
				</div>
				<div class="feed">
					{this.renderItem("David", "Are you my daddy?", 'twitch')}
					{this.renderItem("Chad", "...")}
					{this.renderItem("David", "Defiantly, the father taketh the wide moon of the fortress upon itself to puncture the weather among the ford.", 'twitch')}
					{this.renderItem("David", "*tears*", 'twitch')}
				</div>
				<div class="reply">
					<input type="text" /><UIButton>SEND</UIButton>
				</div>
			</div>
		);
	}
}
