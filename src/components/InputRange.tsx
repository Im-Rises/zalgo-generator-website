import React from 'react';
import './InputRange.scss';

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
		<div className={'div-input-range-holder'}>
			<input type={'range'} ref={props.inputRef} name={'upper-zalgo-range'} min={props.min}
				max={props.max} defaultValue={props.defaultValue} step={props.step}
				onChange={e => {
					setInputRangeValue(parseInt(e.target.value, 10));
				}}/>
			<label htmlFor={'upper-zalgo-range'}>{props.name}{inputRangeValue}</label>
		</div>
	);
};
