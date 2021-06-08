import Button from './Button';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';

const ButtonDisplay = () => {
	return (
		<div style={{ textAlign: 'center', paddingTop: '50px' }}>
			<Button primary>Primary Button</Button>
			<Button outline color="blue">
				Outline Button
			</Button>
			<Button pill color="green">
				Pill Button
			</Button>
			<Button square color="blue">
				Square Button
			</Button>
			<Button disabled>Disabled Button</Button>
			<Button>
				<FontAwesomeIcon icon={faCoffee} /> Icon Button
			</Button>
		</div>
	);
};

export default ButtonDisplay;
