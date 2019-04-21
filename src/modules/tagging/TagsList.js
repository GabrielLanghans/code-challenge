import React from 'react';
import styled from 'styled-components';
import Button from '../../ui-components/forms/Button';
import List from '../../ui-components/List';
import ListItem from '../../ui-components/ListItem';

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
    &:hover {
        ${ButtonContainer} {
            opacity: 1;
            pointer-events: auto;
        }
    }
`;

export default ({tags, removeTag}) => {

    const printCounter = (count) => {
        if(count) {
            return <TextCounter>{count}</TextCounter>;
        }
    }

    return (
        <List id="tags-list">
            {tags.map((tag, index) => {
                return (
                    <TagListItem key={index.toString()}>
                        <span className="tag">{tag.name}</span>
                        {printCounter(tag.texts.length)}
                        <ButtonContainer>
                            <Button className="remove-button" type="button" size="small" onClick={(e) => removeTag(index, e)}>Remove {tag.name}</Button>
                        </ButtonContainer>
                    </TagListItem>
                )
            })}
        </List>
    )
}
