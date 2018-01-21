import {h, Component}					from 'preact/preact';
import UIIcon							from 'ui/icon/icon';
import UIImage							from 'ui/image/image';
import UIButton							from 'ui/button/button';

export default class ViewOBS extends Component {
	constructor( props ) {
		super(props);

		this.state = {
			'obs': null,
			'obsInfo': null,
			'obsStatus': null,
			'obsStream': null,
		};

		this.obsConnect = this.obsConnect.bind(this);
		this.obsHeartbeatEvent = this.obsHeartbeatEvent.bind(this);
		this.obsStatusEvent = this.obsStatusEvent.bind(this);


		this.obsStartStreaming = this.obsStartStreaming.bind(this);
		this.obsStopStreaming = this.obsStopStreaming.bind(this);
		this.obsStartRecording = this.obsStartRecording.bind(this);
		this.obsStopRecording = this.obsStopRecording.bind(this);
	}

	componentWillMount() {
		this.obsInit();
		this.obsConnect();
	}

	obsInit() {
		var OBS = new OBSWebSocket();
		OBS.onStreamStatus(this.obsStatusEvent);
		OBS.onHeartbeat(this.obsHeartbeatEvent);
		OBS.onConnectionOpened(e => {
			OBS.SetHeartbeat({'enable': true});

			var Info = {};
			OBS.GetVersion()
				.then(r => {
					Info.version = r.obsStudioVersion;
					Info.pluginVersion = r.obsWebsocketVersion;
					return OBS.GetRecordingFolder();
				})
				.then(r => {
					Info.folder = r.recFolder;
					return OBS.ListProfiles();
				})
				.then(r => {
					Info.profiles = r.profiles;
					return OBS.GetSceneList();
				})
				.then(r => {
					Info.scenes = r.scenes;
					return OBS.ListSceneCollections();
				})
				.then(r => {
					Info.sceneCollections = r.sceneCollections;
					return OBS.GetCurrentSceneCollection();
				})
				.then(r => {
					Info.currentSceneCollection = r.scName;
					return OBS.GetSourcesList();
				})
				.then(r => {
					Info.sources = r.sources;
//					return OBS.GetSourcesTypesList();
//				})
//				.then(r => {
//					Info.sourcesTypes = r.ids;
					return OBS.GetTransitionList();
				})
				.then(r => {
					Info.transitions = r.transitions;

					console.log(Info);
					this.setState({'obsInfo': Info});

					return OBS.GetStreamingStatus();
				})
				.then(r => {
					this.setState({'obsStatus': r});
				});
		});
		OBS.onConnectionClosed(e => {
			// TODO: Improve this
			this.setState({'obsStatus': null});
		});

		this.setState({'obs': OBS});
	}
	obsConnect() {
		this.state.obs.connect({
			'address': CONFIG.obsServer,
			'password': CONFIG.obsPassword,
		});
	}

	obsStartStreaming() {
		this.state.obs.StartStreaming().catch(e => {
			console.log(e);
		});
	}
	obsStopStreaming() {
		this.state.obs.StopStreaming().catch(e => {
			console.log(e);
		});
	}

	obsStartRecording() {
		this.state.obs.StartRecording().catch(e => {
			console.log(e);
		});
	}
	obsStopRecording() {
		this.state.obs.StopRecording().catch(e => {
			console.log(e);
		});
	}

	obsSetScene( name ) {
		this.state.obs.SetCurrentScene({'scene-name': name}).catch(e => {
			console.log(e);
		});
	}

	obsStatusEvent( e ) {
		//console.log(e);
		this.setState({'obsStream': e});
	}
	obsHeartbeatEvent( e ) {
		//console.log(e);
		this.setState({'obsStatus': e});
	}

	renderStatus( status, service, func ) {
		return <UIButton class={status ? 'on' : 'off'} onClick={func}><UIIcon src={service} /></UIButton>;
	}

	render( props, state ) {
		const OBSStatus = this.renderStatus(state.obs && state.obsStatus, 'obs', this.obsConnect);
		let OBSInfo = [];
		if ( state.obsInfo ) {
			OBSInfo.push(<div><span>VERSION:</span><span class="offline">{state.obsInfo.version}</span><span>({state.obsInfo.pluginVersion})</span></div>);
		}
		if ( state.obsStatus ) {
			OBSInfo.push(<div><span>STREAM:</span>{state.obsStatus.streaming ? <span class="live">{state.obsStatus.streamTimecode}</span> : <span class="offline">OFFLINE</span>}</div>);
			OBSInfo.push(<div><span>RECORD:</span>{state.obsStatus.recording ? <span class="live">{state.obsStatus.recTimecode}</span> : <span class="offline">NO</span>}</div>);

			// Profiles are your encoder settings, stream URL, etc
			if ( state.obsStatus.currentProfile ) {
				OBSInfo.push(<div><span>PROFILE:</span><span class="offline">{state.obsStatus.currentProfile}</span></div>);
			}
		}

		let OBSScenes = [];
		let OBSSceneCollections = [];
		let OBSProfiles = [];
		if ( state.obsInfo && state.obsStatus ) {
			for ( var idx in state.obsInfo.scenes ) {
				let scene = state.obsInfo.scenes[idx];
				OBSScenes.push(
					<div class={scene.name == state.obsStatus.currentScene ? 'active' : ''}>
						<div><span>{scene.name}</span><span class="info">[{scene.sources.length}]</span></div>
						<UIButton onclick={this.obsSetScene.bind(this, scene.name)}>SET</UIButton>
					</div>
				);

			}
			for ( var idx in state.obsInfo.sceneCollections ) {
				let scene = state.obsInfo.sceneCollections[idx];
				OBSSceneCollections.push(<div class={scene['sc-name'] == state.obsInfo.currentSceneCollection ? 'active' : ''}><span>{scene['sc-name']}</span></div>);
			}
			for ( var idx in state.obsInfo.profiles ) {
				let profile = state.obsInfo.profiles[idx];
				OBSProfiles.push(<div class={profile['profile-name'] == state.obsStatus.currentProfile ? 'active' : ''}><span>{profile['profile-name']}</span></div>);
			}
		}

		let OBSStreaming = [];
		if ( state.obsStream ) {
			let Clock = new Date(null);
			Clock.setSeconds(state.obsStream.totalStreamTime);

			OBSStreaming.push(<div>KBits: <strong>{state.obsStream.kbitsPerSec}</strong> (Bytes: <strong>{state.obsStream.bytesPerSec}</strong>)</div>);
			OBSStreaming.push(<div>Frames: <strong>{state.obsStream.numTotalFrames}</strong> (Dropped: <strong>{state.obsStream.numDroppedFrames}</strong> <span title="state.obsStream.strain">[{Math.round(state.obsStream.strain)}%])</span></div>);
			OBSStreaming.push(<div>FPS: <strong title={state.obsStream.fps}>{Math.round(state.obsStream.fps)}</strong> (Time: <strong>{Clock.toISOString().substr(11, 8)}</strong>)</div>);
		}

		return (
			<div id="obs">
				<div class="info">
					<div><span>OBS:</span>{OBSStatus}</div>
					{OBSInfo}
				</div>
				<div class="body">
					<div class="flex">
						<div class="lists">
							<div class="title"><div>SCENES:</div><span class="info">[{OBSScenes.length}]</span></div>
							{OBSScenes}
							<br />
							<div class="title"><div>SCENE COLLECTIONS:</div><span class="info">[{OBSSceneCollections.length}]</span></div>
							{OBSSceneCollections}
							<br />
							<div class="title"><div>PROFILES (output settings):</div><span class="info">[{OBSProfiles.length}]</span></div>
							{OBSProfiles}
						</div>
						<div class="actions">
							<div>
								<div class="title">STREAM INFO:</div>
								{OBSStreaming}
							</div>
							<br />
							<div class="flex">
								<div>Streaming:</div>
								<UIButton onclick={this.obsStartStreaming}>Start</UIButton>
								<UIButton onclick={this.obsStopStreaming}>Stop</UIButton>
							</div>
							<div class="flex">
								<div>Recording:</div>
								<UIButton onclick={this.obsStartRecording}>Start</UIButton>
								<UIButton onclick={this.obsStopRecording}>Stop</UIButton>
							</div>
							<br />
							<div>
								<strong>TODO:</strong> put something here
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
