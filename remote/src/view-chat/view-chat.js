import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UILink							from 'ui/link/link';

export default class ViewChat extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'twitch': false,
		};
	}

	renderItem( name, text, service = 'tv' ) {
		return (
			<div class="item">
				<UIIcon src={service} /><span class="name">{name}: </span><span class="text">{text}</span>
			</div>
		);
	}

	render( props, state ) {


		return (
			<div id="chat">
				<div class="info">
					<div>Twitch: {state.twitch ? <span class="on">CONNECTED</span> : <span class="off">DISCONNECTED</span>}</div>
				</div>
				<div class="feed">
					{this.renderItem("David", "Are you my daddy?", 'twitch')}
					{this.renderItem("Chad", "...")}
					{this.renderItem("David", "*tears*", 'twitch')}
				</div>
				<div class="reply">
					The moon is while
				</div>
			</div>
		);
	}
}
