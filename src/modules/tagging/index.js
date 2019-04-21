import React, {useState} from 'react';
import styled from 'styled-components';
import DefaultBox from '../../ui-components/DefaultBox';
import Text from './Text';
import AddTag from './AddTag';
import TagsList from './TagsList';
import tagsState from './tagsState';
import {tabletLandscapeDown} from '../../MediaBreakpoints';

const TaggingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    @media (${tabletLandscapeDown}) {
        flex-wrap: wrap-reverse;
    }
`;

const TextCol = styled.div`
    flex-basis: calc(70% - 15px);
    height: 100%;
    @media (${tabletLandscapeDown}) {
        flex-basis: 100%;
    }
`;

const TagsCol = styled.div`
    flex-basis: 30%;
    height: 100%;
    @media (${tabletLandscapeDown}) {
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

const DefaultBoxScroll = styled(DefaultBox)`
  height: 100%;
  overflow: auto;
`;

export default (props) => {

    const {tags, addTag, removeTag, addText, removeText} = tagsState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedText, setSelectedText] = useState(null);

    const handleAddTag = (tagName, e) => {
        addTag(tagName);
    }
    const handleRemoveTag = (index, e) => {
        if(parseInt(index, 10) >= 0) {
            removeTag(index);
        }
    }
    const handleSelectText = (selectedRange, text) => {
        setSelectedRange(selectedRange);
        setSelectedText(text);
    }

    return(
        <TaggingContainer>
            <SEOTitle>Code Challenge</SEOTitle>
            <TextCol>
                <DefaultBox>
                    <Text tags={tags} removeText={removeText} selectText={(range, text) => handleSelectText(range, text)} />
                </DefaultBox>
            </TextCol>
            <TagsCol>
                <DefaultBoxScroll>
                    <AddTag id="add-tag" addTag={handleAddTag} />
                    <TagsList tags={tags} removeTag={handleRemoveTag} addText={addText} selectedRange={selectedRange} selectedText={selectedText} emptySelection={() => handleSelectText(null, '')} />
                </DefaultBoxScroll>
            </TagsCol>
        </TaggingContainer>
    )
}
