import styled from 'styled-components';

export default styled.button`
    margin-top: ${props => props.size && props.size === 'small' ? "2px" : 0};
    padding: ${props => props.size && props.size === 'small' ? "0 5px" : "0 15px"};
    height: ${props => props.size && props.size === 'small' ? "20px" : "42px"};
    line-height: ${props => props.size && props.size === 'small' ? "20px" : "42px"};
    font-size: ${props => props.size && props.size === 'small' ? "9px" : "16px"};
    color: #666;
    border: 1px solid #c5d1d9;
    border-radius: ${props => props.size && props.size === 'small' ? "4px" : "6px"};
    background: none;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    margin-left: ${props => props.left || 0};

    &:hover {
        background-color: #4c5c67;
        color: #fff;
    }
`;
