import React, {useState} from 'react';
import styled from 'styled-components';
import DefaultBox from '../../ui-components/DefaultBox';
import Text from './Text';
import AddTag from './AddTag';
import TagsList from './TagsList';


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

export default (props) => {

	const tags = [];

    const handleAddTag = (tagName, e) => {
        console.log('tagName', tagName);
    }

    const handleRemoveTag = (index, e) => {
        console.log('removeTag', index);
    }

    return(
        <TaggingContainer>
            <TextCol>
                <DefaultBox>
                    <Text />
                </DefaultBox>
            </TextCol>
            <TagsCol>
                <DefaultBox>
                    <AddTag addTag={handleAddTag} />
                    <TagsList tags={tags} removeTag={handleRemoveTag} />
                </DefaultBox>
            </TagsCol>
        </TaggingContainer>
    )
}
