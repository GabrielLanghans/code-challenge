import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import listMarkerSrc from '../images/list-marker.gif';
import DefaultBox from './DefaultBox';

const ModalContainer = styled.div`
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    opacity: ${props => props.show ? 1 : 0};
    transform: ${props => props.show ? 'translate3D(-50%, -50%, 0)' : 'translate3D(-50%, -60%, 0)'};

    position: fixed;
    z-index: 20;
    top: 50%;
    left: 50%;
    width: 50vw;
    height: 35vw;
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;
const Overlay = styled.div`
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    opacity: ${props => props.show ? 0.7 : 0};

    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const CloseButton = styled.div`
    position: absolute;
    top: -25px;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    &:hover {
        color: #fff;
        background-color: #4c5c67;
    }
`;


export default ({show, children, closeModal}) => {
    return(
        <React.Fragment>
            <ModalContainer show={show}>
                <DefaultBox id="test">
                    <CloseButton title="Close" onClick={closeModal}>x</CloseButton>
                    {children}
                </DefaultBox>
            </ModalContainer>
            <Overlay show={show} />
        </React.Fragment>
    )
}
