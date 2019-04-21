import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '../../ui-components/forms/TextField';
import Button from '../../ui-components/forms/Button';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e3e9ee;
`;

export default ({addTag}) => {

    const [tagName, setTagName] = useState('');

    const handleChangeTagName = (e) => {
        setTagName(e.target.value);
    }
    const handleAddTag = (tagName, e) => {
        addTag(tagName, e);
        setTagName('');
    }

    return(
        <Container>
            <TextField id="tag-field" value={tagName} type="text" placeholder="Add tag" maxLength="30" inline onChange={handleChangeTagName} />
            <Button type="button" onClick={(e) => handleAddTag(tagName, e)}>+</Button>
        </Container>
    )
}
