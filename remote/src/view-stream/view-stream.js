import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

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
		};
	}

	componentWillMount() {
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
			this.renderStatus(state.twitch, 'twitch'),
			this.renderStatus(state.youtube, 'youtube'),
			this.renderStatus(state.mixer, 'mixer'),
			this.renderStatus(state.smashcast, 'smashcast'),
		];

		return (
			<div id="stream">
				<div class="info">
					<div><span>SERVICE:</span>{ServiceStatus}</div>
					<div><span>LIVE:</span>{LiveStatus}</div>
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
