import React from 'react';
import styled from 'styled-components';
import Button from '../../ui-components/forms/Button';
import List from '../../ui-components/List';
import ListItem from '../../ui-components/ListItem';
import {getSafeRanges, highlightRange} from '../../Utility';

const ButtonContainer = styled.div`
    display: inline;
    opacity: 0;
    pointer-events: none;
    margin-left: 15px;
    transition: opacity 0.3s ease-in-out;
`;

const TextCounter = styled.span`
    position: relative;
    padding-left: 19px;
    font-size: 10px;
    font-weight: bold;
    color: #15cf6d;
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 9px;
        top: 2px;
        width: 6px;
        height: 6px;
        background: #15cf6d;
        border-radius: 50%;
    }
`;

const TagListItem = styled(props => <ListItem {...props} />)`
    transition: background-color 0.2s ease-in-out;

    &:hover {
        ${ButtonContainer} {
            opacity: 1;
            pointer-events: auto;
        }

        .active & {
            cursor: pointer;
            background-color: rgba(197,209,217,.45);
        }
    }
`;


export default ({tags, removeTag, addText, selectedRange, selectedText, emptySelection}) => {

    const printCounter = (count) => {
        if(count) {
            return <TextCounter>{count}</TextCounter>;
        }
    }


    const handleAddTextToTag = (index, selectedText, selectedRange, e) => {
        e.stopPropagation();
        e.preventDefault();
        if(selectedText) {
            addText(index, selectedText, selectedRange);
            emptySelection();
        }
    }
    const handleRemoveTag = (index, e) => {
        e.stopPropagation();
        removeTag(index, e);
    }

    return (
        <List id="tags-list" className={selectedText ? 'active' : ''}>
            {tags.map((tag, index) => {
                return (
                    <TagListItem className="tag-list-item" key={index.toString()} onClick={(e) => handleAddTextToTag(index, selectedText, selectedRange, e)}>
                        <span className="tag">{tag.name}</span>
                        {printCounter(tag.texts.length)}
                        <ButtonContainer>
                            <Button className="remove-button" type="button" size="small" onClick={(e) => handleRemoveTag(index, e)}>Remove {tag.name}</Button>
                        </ButtonContainer>
                    </TagListItem>
                )
            })}
        </List>
    )
}
