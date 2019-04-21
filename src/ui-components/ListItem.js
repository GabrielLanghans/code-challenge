import styled from 'styled-components';
import listMarkerSrc from '../images/list-marker.gif';

export default styled.li`
    position: relative;
    margin: 0;
    padding: 0 0 0 36px;
    min-height: 24px;
    line-height: 100%;
    font-size: 12px;
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 17px;
        top: 3px;
        width: 8px;
        height: 8px;
        background: url(${listMarkerSrc});
    }
`;
