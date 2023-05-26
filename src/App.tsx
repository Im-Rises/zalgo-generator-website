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

	const textareaRef = React.createRef<HTMLTextAreaElement>();
	const textareaUnzalgoRef = React.createRef<HTMLTextAreaElement>();
	const zalgoParagraphRef = React.createRef<HTMLParagraphElement>();

	const zalgoRangeUpRef = React.createRef<HTMLInputElement>();
	const zalgoRangeMidRef = React.createRef<HTMLInputElement>();
	const zalgoRangeDownRef = React.createRef<HTMLInputElement>();

	const doZalgo = () => {
		const zalgoHeightUp = parseInt(zalgoRangeUpRef.current!.value, 10);
		const zalgoHeightMid = parseInt(zalgoRangeMidRef.current!.value, 10);
		const zalgoHeightDown = parseInt(zalgoRangeDownRef.current!.value, 10);

		const zalgoText = zalgoGeneration(textareaRef.current!.value,
			zalgoHeightUp,
			zalgoHeightMid,
			zalgoHeightDown,
		);

		zalgoParagraphRef.current!.innerHTML = zalgoText;
		textareaUnzalgoRef.current!.value = zalgoText;
	};

	const undoZalgo = () => {
		zalgoParagraphRef.current!.innerHTML = unzalgoText(textareaUnzalgoRef.current!.value);
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
					<h2>Text input areas</h2>
					<TextAreaInputOutput textareaRef={textareaRef} actionButtonFunc={doZalgo}
						handleCopyFunc={handleCopy} actionText={'Generate'}/>
					<TextAreaInputOutput textareaRef={textareaUnzalgoRef} actionButtonFunc={undoZalgo}
						handleCopyFunc={handleCopy} actionText={'Unzalgo'}/>
				</section>
				<section className={'App-zalgo-text'}>
					<div>
						<h2>Real zalgo text output</h2>
					</div>
					<div className={'div-block'}>
						<p ref={zalgoParagraphRef}/>
					</div>
					<button onClick={async () => handleCopy(zalgoParagraphRef.current!.innerHTML)}>Copy</button>
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
