import React from 'react';
import ReactLoading from 'react-loading';
const Loader = ({ type, color }) => (
    
    <ReactLoading type={type} color={color} height={64} width={64} delay={100} />
    
);

export default Loader;
