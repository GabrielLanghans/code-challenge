import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);




ReactDom.render(
    <App />,
    document.getElementById('app')
);
