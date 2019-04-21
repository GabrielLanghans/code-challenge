import React from 'react';
import tagsState from '../tagsState';
import {renderHook, cleanup, act} from 'react-hooks-testing-library'

afterAll(cleanup);

const {result} = renderHook(() => tagsState());

describe('Testing tags hooks', () => {
    test('tags must be an empty array by default', () => {
        expect(result.current.tags.length).toBe(0);
    });

    test('Adding an unamed tag', () => {
        act(() => result.current.addTag());

        expect(result.current.tags.length).toBe(1);
        expect(result.current.tags[0].name).toBe('tag 1');
    });

    test('Adding a second tag named "My Second Tag"', () => {
        act(() => result.current.addTag('My Second Tag'));

        expect(result.current.tags.length).toBe(2);
        expect(result.current.tags[1].name).toBe('My Second Tag');
    });

    test('Remove the second tag, the last tag must be "tag 1"', () => {
        act(() => result.current.removeTag(1));

        expect(result.current.tags[result.current.tags.length -1].name).toBe('tag 1');
    });

    test('A new tag must not have any text atached to it', () => {
        act(() => result.current.removeTag(1));

        expect(result.current.tags[0].texts.length).toBe(0);
    });

    test('Add a text "Lorem ipsum" to tag 1', () => {
        act(() => result.current.addText(0, "Lorem ipsum"));

        expect(result.current.tags[0].texts.length).toBe(1);
        expect(result.current.tags[0].texts[0].text).toBe("Lorem ipsum");
    });

    test('Add more three texts "Lorem ipsum" to tag 1', () => {
        act(() => result.current.addText(0, "Lorem ipsum"));
        act(() => result.current.addText(0, "Lorem ipsum"));
        act(() => result.current.addText(0, "Lorem ipsum"));

        expect(result.current.tags[0].texts.length).toBe(4);
    });

    test('Remove the second text "Lorem ipsum" from tag 1', () => {
        act(() => result.current.removeText(0, 1));

        expect(result.current.tags[0].texts.length).toBe(3);
    });


});
