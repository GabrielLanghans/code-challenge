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
    // const handleAddTag = (e) => {
    //     console.log('add', tagName);
    // }

    return(
        <Container>
            <TextField value={tagName} type="text" placeholder="Add tag" maxLength="30" inline onChange={handleChangeTagName} />
            <Button type="button" onClick={(e) => addTag(tagName, e)}>+</Button>
        </Container>
    )
}
