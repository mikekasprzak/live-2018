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
	}

	render( props ) {
		//document.title = this.getTitle(node);

		return (
			<div>
				<div>Hey</div>
				<UIIcon>radio-empty</UIIcon>
				<UIImage src="../common/ChickenC64.png" />
			</div>
		);
	}
}

render(<Main />, document.body);
