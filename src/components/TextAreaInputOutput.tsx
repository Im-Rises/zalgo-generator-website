import React from 'react';

type Props = {
	paragraphRef: React.RefObject<HTMLParagraphElement>;
	actionButtonFunc: () => void;
	handleCopyFunc: (text: string) => void;
	actionText: string;
};
export const TextAreaInputOutput = (props: Props) => (
	<>
		{/* <textarea ref={props.textareaRef} maxLength={200}/> */}
		<div className={'text-area-paragraph'}>
			<p contentEditable='true' ref={props.paragraphRef}></p>
		</div>
		<div className={'text-area-button'}>
			<button onClick={props.actionButtonFunc}>{props.actionText}</button>
			<button onClick={async () => {
				props.handleCopyFunc(props.paragraphRef.current!.textContent!);
			}}>Copy
			</button>
		</div>
	</>
);
