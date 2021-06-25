import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import * as renderer from 'react-test-renderer';
import ButtonDisplay from './ButtonDisplay';

describe('ButtonDisplay tests', () => {
	it('snapshot testing ButtonDisplay componen', () => {
		const wrapper = renderer.create(<ButtonDisplay />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
