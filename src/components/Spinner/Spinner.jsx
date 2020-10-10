import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

const css = `
padding : 10px;
`;

const Spinner = ({ loading = true }) => {
    return (
        <PulseLoader
            css={css}
            size={12}
            margin={2}
            color={"rgb(108, 172, 255)"}
            loading={loading}
        />
    );
};

export default Spinner;