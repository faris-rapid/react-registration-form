import React from 'react';
import * as renderer from 'react-test-renderer';
import Button from './Button';

describe('Button tests', () => {
	it('snapshot testing Button componen', () => {
		const wrapper = renderer.create(<Button />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
