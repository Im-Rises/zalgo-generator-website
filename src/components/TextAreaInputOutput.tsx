import React from 'react';

type Props = {
	textareaRef: React.RefObject<HTMLTextAreaElement>;
	actionButtonFunc: () => void;
	handleCopyFunc: (text: string) => void;
	actionText: string;
};
export const TextAreaInputOutput = (props: Props) => (
	<>
		<textarea ref={props.textareaRef} maxLength={200}/>
		<div>
			<button onClick={props.actionButtonFunc}>{props.actionText}</button>
			<button onClick={async () => {
				console.log(props.textareaRef.current!.value);
				props.handleCopyFunc(props.textareaRef.current!.value);
			}}>Copy
			</button>
		</div>
	</>
);
