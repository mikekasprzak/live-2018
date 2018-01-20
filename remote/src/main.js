import {h, render, Component}			from "preact/preact";

import ViewMain							from "view-main/view-main";
import ViewChat							from "view-chat/view-chat";

// @ifdef DEBUG
//import {}								from 'preact-devtools/devtools';
// @endif

window.CONFIG = Object.assign({
	'obsServer': "localhost:4444",
}, window.CONFIG || {});

class Main extends Component {
	constructor( props ) {
		super(props);
		// @ifdef DEBUG
		console.log("Running in DEBUG mode");
		// @endif

		this.state = {
			'url': parseHashBang()
		};

		window.addEventListener('hashchange', this.hashChange.bind(this));
		window.addEventListener('navchange', this.navChange.bind(this));
	}

	componentWillMount() {
		this.hashChange();
	}

	hashChange( e ) {
		if ( window.location.href.indexOf('#!/') === -1 ) {
			// Assume if no variables are set as part of the URL, we should keep the old ones
			var Vars = window.location.search;
			if ( !Vars ) {
				if ( window.location.hash.indexOf('?') !== -1 ) {
					Vars = '?' + (window.location.hash.split('?'))[1];
				}
			}
			history.replaceState(null, null, window.location.pathname + '#!/' + Vars);
			this.setState({'url': parseHashBang()});
		}

		this.setState({'url': parseHashBang()});
		this.onChange(e);
	}

	navChange( e ) {
		if ( e.detail.location.href !== e.detail.old.href ) {
			// Assume if no variables are set as part of the URL, we should keep the old ones
			var Vars = e.detail.location.search;
			if ( !Vars ) {
				if ( e.detail.old.hash.indexOf('?') !== -1 ) {
					Vars = '?' + (e.detail.old.hash.split('?'))[1];
				}
			}
			history.pushState(null, null, e.detail.location.pathname + e.detail.location.hash + Vars);

			this.setState({'url': parseHashBang()});
			this.onChange(e);
		}
	}

	onChange( e ) {
		window.scrollTo(0, 0);
	}

	render( props, state ) {
		document.title = state.url.pathname;

		return (
			<div id="content">
				<ViewMain />
				<ViewChat />
			</div>
		);
	}
}

//				<div>Hey</div>
//				<UIIcon>checkbox-checked</UIIcon>
//				<UIImage class="chicken" src="../common/ChickenC64.png" onanimationend={this.finito} />
//				<div><UILink href="#!/">null</UILink>, <UILink href="#!/puber">puber</UILink>, <UILink href="#!/shemba">shemba</UILink></div>


render(<Main />, document.body);
