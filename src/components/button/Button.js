import styled, { css } from 'styled-components';

const Button = styled.button`
	background: tomato;
	border-radius: 5px;
	border: 2px solid;
	color: white;
	margin: 1rem 1em;
	padding: 0.8em 1.2em;
	cursor: pointer;

	${(props) =>
		props.primary &&
		css`
			background: tomato;
			color: white;
		`}
	${(props) =>
		props.outline &&
		css`
			background: white;
			color: tomato;
			border: 2px solid tomato;
		`}
		${(props) =>
		props.pill &&
		css`
			background: green;
			color: white;
			border-radius: 20px;
		`}
		${(props) =>
		props.square &&
		css`
			background: green;
			color: white;
			border: 2px solid;
			border-radius: 0px;
		`}
		${(props) =>
		props.disabled &&
		css`
			opacity: 0.65;
			cursor: not-allowed;
		`};
`;

export default Button;
