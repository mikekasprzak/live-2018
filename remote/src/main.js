import {h, render, Component}			from 'preact/preact';

// @ifdef DEBUG
import {}								from 'preact-devtools/devtools';
// @endif


class Main extends Component {
	constructor( props ) {
		super(props);

		console.log("[constructor]");

		// @ifdef DEBUG
		console.log("Running in DEBUG mode");
		// @endif
	}

	render( props ) {
		//document.title = this.getTitle(node);

		return <div>Hey</div>;
	}
}

render(<Main />, document.body);
