import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;  
`;

const Loader = () => {
    return (
        <div className="loader-container">
            <ClipLoader color={'blue'} loading={true} css={override} size={50} />
        </div>
    );
};

export default Loader;
