import {h, render, Component}			from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';

// @ifdef DEBUG
//import {}								from 'preact-devtools/devtools';
// @endif


class Main extends Component {
	constructor( props ) {
		super(props);
		console.log("[constructor]");
		// @ifdef DEBUG
		console.log("Running in DEBUG mode");
		// @endif

		this.state = {
			'url': parseHashBang()
		};

		window.addEventListener('hashchange', this.hashChange.bind(this));
	}

	hashChange( e ) {
		this.setState({'url': parseHashBang()});
	}

	render( props, state ) {
		//document.title = this.getTitle(node);

		console.log(state.url);

		return (
			<div>
				<div>Hey</div>
				<UIIcon>checkbox-checked</UIIcon>
				<UIImage src="../common/ChickenC64.png" />
			</div>
		);
	}
}

render(<Main />, document.body);
