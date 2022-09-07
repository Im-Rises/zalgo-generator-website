import type {RefObject} from 'react';
import React from 'react';
import {
	addZalgoToString,
	zalgoDownArray,
	zalgoMidArray,
	zalgoUpArray,
	unzalgoStringUpMidDown,
} from './zalgo/zalgo-generator';
import './App.css';

function App() {
	const zalgoHeight = 1;
	const zalgoMaxHeight = 20;
	const textareaRef: RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();
	const textareaUnzalgoRef: RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();
	const zalgoParagraphRef: RefObject<HTMLParagraphElement> = React.createRef<HTMLParagraphElement>();
	const zalgoRangeUpRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
	const zalgoRangeMidRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
	const zalgoRangeDownRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

	const doZalgo = () => {
		let textareaBuffer = textareaRef.current?.value;
		if (textareaBuffer) {
			textareaBuffer = unzalgoStringUpMidDown(textareaBuffer);
			textareaBuffer = addZalgoToString(textareaBuffer, parseInt(zalgoRangeUpRef.current!.value, 10), zalgoUpArray);
			textareaBuffer = addZalgoToString(textareaBuffer, parseInt(zalgoRangeMidRef.current!.value, 10), zalgoMidArray);
			textareaBuffer = addZalgoToString(textareaBuffer, parseInt(zalgoRangeDownRef.current!.value, 10), zalgoDownArray);
			textareaRef.current!.value = textareaBuffer;
			zalgoParagraphRef.current!.innerHTML = textareaBuffer;
		}
	};

	const undoZalgo = () => {
		let textareaBuffer = textareaUnzalgoRef.current?.value;
		if (textareaBuffer) {
			textareaBuffer = unzalgoStringUpMidDown(textareaBuffer);
			textareaUnzalgoRef.current!.value = textareaBuffer;
		}
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Zalgo generator</h1>
				<div className={'App-link'}>
					<h2>Github project link</h2>
					<a href={'https://github.com/Im-Rises/zalgo-generator'} target={'_blank'} rel='noreferrer'>
						<p>Im-Rises/zalgo-generator</p></a>
				</div>
			</header>
			<div className={'App-section-splitter'}>
				<section className={'App-text-area'}>
					<h2>Text input areas</h2>
					<textarea ref={textareaRef} maxLength={200}/>
					<button onClick={doZalgo}>Generate</button>
					<textarea ref={textareaUnzalgoRef} maxLength={200}/>
					<button onClick={undoZalgo}>Delete zalgo</button>
				</section>
				<aside className={'App-zalgo-text'}>
					<div>
						<h2>Real zalgo text output</h2>
					</div>
					<div className={'div-block'}>
						<p ref={zalgoParagraphRef}/>
					</div>
				</aside>
			</div>
			<div className={'App-zalgo-controller'}>
				<h2>Zalgo height controllers</h2>
				<div className={'controllers-wrapper'}>
					<div>
						<input type={'range'} ref={zalgoRangeUpRef} name={'upper-zalgo-range'} min={0} max={zalgoMaxHeight} defaultValue={zalgoHeight} step={1}/>
						<label htmlFor={'upper-zalgo-range'}>Upper zalgo height</label>
					</div>
					<div>
						<input type={'range'} ref={zalgoRangeMidRef} name={'middle-zalgo-range'} min={0} max={zalgoMaxHeight} defaultValue={zalgoHeight} step={1}/>
						<label htmlFor={'middle-zalgo-range'}>Middle zalgo height</label>
					</div>
					<div>
						<input type={'range'} ref={zalgoRangeDownRef} name={'down-zalgo-range'} min={0} max={zalgoMaxHeight} defaultValue={zalgoHeight} step={1}/>
						<label htmlFor={'down-zalgo-range'}>Down zalgo height</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
