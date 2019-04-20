import styled from 'styled-components';

export default styled.input`
    box-sizing: border-box;
    margin-right: ${props => props.inline ? '10px' : 0};
    padding: 0 25px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    border: 1px solid #c5d1d9;
    border-radius: 6px;
`;
