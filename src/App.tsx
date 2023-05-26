import React from 'react';
import './App.scss';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {AUTHOR, GITHUB_URL} from './constants/constant-zalgo-generator';
import {zalgoGeneration, unzalgoText} from 'zalgo-generator';
import {InputRange} from './components/InputRange';
import {TextAreaInputOutput} from './components/TextAreaInputOutput';

const App = () => {
	const stepZalgoHeight = 1;
	const defaultZalgoHeight = 1;
	const minZalgoHeight = 1;
	const maxZalgoHeight = 25;

	const paragraphRef = React.createRef<HTMLParagraphElement>();
	const paragraphUnzalgoRef = React.createRef<HTMLParagraphElement>();
	const zalgoParagraphRef = React.createRef<HTMLParagraphElement>();

	const zalgoRangeUpRef = React.createRef<HTMLInputElement>();
	const zalgoRangeMidRef = React.createRef<HTMLInputElement>();
	const zalgoRangeDownRef = React.createRef<HTMLInputElement>();

	const doZalgo = () => {
		const zalgoHeightUp = parseInt(zalgoRangeUpRef.current!.value, 10);
		const zalgoHeightMid = parseInt(zalgoRangeMidRef.current!.value, 10);
		const zalgoHeightDown = parseInt(zalgoRangeDownRef.current!.value, 10);

		const zalgoText = zalgoGeneration(paragraphRef.current!.textContent!,
			zalgoHeightUp,
			zalgoHeightMid,
			zalgoHeightDown,
		);

		zalgoParagraphRef.current!.innerHTML = zalgoText;
		paragraphUnzalgoRef.current!.textContent = zalgoText;
	};

	const undoZalgo = () => {
		const text = unzalgoText(paragraphUnzalgoRef.current!.textContent!);
		paragraphRef.current!.textContent = text;
		zalgoParagraphRef.current!.innerHTML = text;
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard', text);
		} catch (err: unknown) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Zalgo text generator</h1>
				<GitHubProjectPanel link={GITHUB_URL} author={AUTHOR}/>
			</header>
			<div className={'App-section-splitter'}>
				<section className={'App-text-area'}>
					<span><h2>Text input areas</h2></span>
					<div>
						<TextAreaInputOutput paragraphRef={paragraphRef} actionButtonFunc={doZalgo}
							handleCopyFunc={handleCopy} actionText={'Generate'}/>
					</div>
					<div><TextAreaInputOutput paragraphRef={paragraphUnzalgoRef} actionButtonFunc={undoZalgo}
						handleCopyFunc={handleCopy} actionText={'Unzalgo'}/>
					</div>
				</section>
				<section className={'App-zalgo-text'}>
					<span><h2>Real zalgo text output</h2></span>
					<div className={'align-div-block'}>
						<div className={'div-text-reat'}>
							<p ref={zalgoParagraphRef}></p>
						</div>
					</div>
					<div className={'div-button-copy'}>
						<button onClick={async () => handleCopy(zalgoParagraphRef.current!.innerHTML)}>Copy</button>
					</div>
				</section>
			</div>
			<div className={'App-zalgo-controller'}>
				<h2>Zalgo height controllers</h2>
				<div className={'controllers-wrapper'}>
					<InputRange inputRef={zalgoRangeUpRef} name={'Upper zalgo height: '} min={minZalgoHeight}
						max={maxZalgoHeight} defaultValue={defaultZalgoHeight} step={stepZalgoHeight}/>
					<InputRange inputRef={zalgoRangeMidRef} name={'Middle zalgo height: '} min={minZalgoHeight}
						max={maxZalgoHeight} defaultValue={defaultZalgoHeight} step={stepZalgoHeight}/>
					<InputRange inputRef={zalgoRangeDownRef} name={'Lower zalgo height: '} min={minZalgoHeight}
						max={maxZalgoHeight} defaultValue={defaultZalgoHeight} step={stepZalgoHeight}/>
				</div>
			</div>
		</div>
	);
};

export default App;
