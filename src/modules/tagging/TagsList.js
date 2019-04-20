import React from 'react';
import listMarkerSrc from '../../images/list-marker.gif';
import styled from 'styled-components';
import Button from '../../ui-components/forms/Button';

const ButtonContainer = styled.div`
    display: inline;
    opacity: 0;
    pointer-events: none;
    margin-left: 15px;
    transition: opacity 0.3s ease-in-out;
`;
const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 0 0 17px;
`;
const ListItem = styled.li`
    position: relative;
    margin: 0;
    padding: 0 0 0 19px;
    line-height: 100%;
    font-size: 12px;
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 3px;
        width: 8px;
        height: 8px;
        background: url(${listMarkerSrc});
    }
    &:hover {
        ${ButtonContainer} {
            opacity: 1;
            pointer-events: auto;
        }
    }
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

export default ({tags, removeTag}) => {

    const printCounter = (count) => {
        if(count) {
            return <TextCounter>{count}</TextCounter>;
        }
    }

    return (
        <List>
            {tags.map((tag, index) => {
                return (
                    <ListItem key={index.toString()}>
                        {tag.name}
                        {printCounter(tag.selections.length)}
                        <ButtonContainer>
                            <Button type="button" size="small" onClick={(e) => removeTag(index, e)}>Remove {tag.name}</Button>
                        </ButtonContainer>
                    </ListItem>
                )
            })}
        </List>
    )
}
