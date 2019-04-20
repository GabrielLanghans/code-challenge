import React, {useState} from 'react';
import styled from 'styled-components';

const TaggingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 899px) {
        flex-wrap: wrap-reverse;
    }
`;

export default (props) => {

    return(
        <TaggingContainer>
            Tagging
        </TaggingContainer>
    )
}
