import React from 'react';

type Props = {
	inputRef: React.RefObject<HTMLInputElement>;
	name: string;
	min: number;
	max: number;
	defaultValue: number;
	step: number;
};

export const InputRange = (props: Props) => {
	const [inputRangeValue, setInputRangeValue] = React.useState(props.defaultValue);
	return (
		<div>
			<input type={'range'} ref={props.inputRef} name={'upper-zalgo-range'} min={props.min}
				max={props.max} defaultValue={props.defaultValue} step={props.step}
				onChange={e => {
					setInputRangeValue(parseInt(e.target.value, 10));
				}}/>
			<label htmlFor={'upper-zalgo-range'}>Upper zalgo
                height: {inputRangeValue}</label>
		</div>
	);
};
