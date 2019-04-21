import React, {useState} from 'react';
import styled from 'styled-components';
import DefaultBox from '../../ui-components/DefaultBox';
import Text from './Text';
import AddTag from './AddTag';
import TagsList from './TagsList';
import tagsState from './tagsState';

const TaggingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 899px) {
        flex-wrap: wrap-reverse;
    }
`;

const TextCol = styled.div`
    flex-basis: calc(70% - 15px);
    @media (max-width: 899px) {
        flex-basis: 100%;
    }
`;

const TagsCol = styled.div`
    flex-basis: 30%;
    @media (max-width: 899px) {
        flex-basis: 100%;
        margin-bottom: 15px;
    }
`;

const SEOTitle = styled.h1`
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
    text-indent: -9999px;
    position: absolute;
    width: 0;
    height: 0;
`;

export default (props) => {

    const {tags, addTag, removeTag, addText, removeText} = tagsState([]);

    const handleAddTag = (tagName, e) => {
        addTag(tagName);
    }
    const handleRemoveTag = (index, e) => {
        if(parseInt(index, 10) >= 0) {
            removeTag(index);
        }
    }

    return(
        <TaggingContainer>
            <SEOTitle>Code Challenge</SEOTitle>
            <TextCol>
                <DefaultBox>
                    <Text tags={tags} />
                </DefaultBox>
            </TextCol>
            <TagsCol>
                <DefaultBox>
                    <AddTag id="add-tag" addTag={handleAddTag} />
                    <TagsList tags={tags} removeTag={handleRemoveTag} />

                    {
                        //<button id="add-button" type="button" onClick={()=>addText(0, 'first text')}>add text to first tag</button>
                        //<button type="button" onClick={()=>removeText(0, 1)}>remove second text from the first tag</button>
                    }

                </DefaultBox>
            </TagsCol>
        </TaggingContainer>
    )
}
