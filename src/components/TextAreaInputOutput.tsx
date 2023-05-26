import React from 'react';
import './TextAreaInputOutput.scss';

type Props = {
	paragraphRef: React.RefObject<HTMLParagraphElement>;
	actionButtonFunc: () => void;
	handleCopyFunc: (text: string) => void;
	actionText: string;
};
export const TextAreaInputOutput = (props: Props) => (
	<div className={'text-area-paragraph-holder'}>
		<div className={'text-area-paragraph'}>
			<textarea></textarea>
		</div>
		<div className={'text-area-button'}>
			<button onClick={props.actionButtonFunc}>{props.actionText}</button>
			<button onClick={async () => {
				props.handleCopyFunc(props.paragraphRef.current!.textContent!);
			}}>Copy
			</button>
		</div>
	</div>
);
