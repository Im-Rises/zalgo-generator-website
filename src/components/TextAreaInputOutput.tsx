import React from 'react';
import './TextAreaInputOutput.scss';

type Props = {
	textareaRef: React.RefObject<HTMLTextAreaElement>;
	actionButtonFunc: () => void;
	handleCopyFunc: (text: string) => void;
	actionText: string;
	maxLength: number;
};
export const TextAreaInputOutput = (props: Props) => (
	<div className={'text-area-paragraph-holder'}>
		<div className={'text-area-paragraph'}>
			<textarea ref={props.textareaRef} maxLength={props.maxLength}></textarea>
		</div>
		<div className={'text-area-button'}>
			<button onClick={props.actionButtonFunc}>{props.actionText}</button>
			<button onClick={async () => {
				props.handleCopyFunc(props.textareaRef.current!.textContent!);
			}}>Copy
			</button>
		</div>
	</div>
);
