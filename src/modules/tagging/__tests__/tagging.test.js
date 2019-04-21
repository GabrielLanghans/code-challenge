import React from 'react';
import Tagging from '../index';
import tagsState from '../tagsState';
import {toBeInTheDocument} from 'jest-dom';
import {render, fireEvent, cleanup} from "react-testing-library";

expect.extend({toBeInTheDocument});
afterAll(cleanup);

const {getByText, container} = render(
    <Tagging />,
);

describe('Testing adding and removing tags from the UI', () => {

    test('Add a tag without name', () => {
        expect(getByText('+')).toBeInTheDocument();
        expect(container.querySelector('.tag')).not.toBeInTheDocument();

        fireEvent.click(getByText('+'));

        expect(container.querySelector('.tag')).toBeInTheDocument();
        expect(getByText('tag 1')).toBeInTheDocument();
    });

    test('Add a second tag named "Tag Number 2"', () => {
        fireEvent.change(container.querySelector('#tag-field'), { target: { value: 'Tag Number 2' } });
        fireEvent.click(getByText('+'));

        const tags = container.querySelectorAll('.tag');
        expect(tags[1].textContent).toBe('Tag Number 2');
    });

    test('Remove the fist tag, then, the only tag left must be "Tag Number 2"', () => {
        const tagsList = container.querySelector('#tags-list');

        expect(tagsList.childNodes.length).toBe(2);

        fireEvent.click(tagsList.childNodes[0].querySelector('.remove-button'));

        expect(tagsList.childNodes.length).toBe(1);
        expect(tagsList.querySelectorAll('.tag')[0].textContent).toBe('Tag Number 2');
    });

});
