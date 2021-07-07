import React from 'react';

const GreyBoxed = ({deps, children, width}) => {
    const show = (deps ?? []).filter(v => v === null || v === undefined || v === false).length === 0;

    return (
        show ? children : <GreyBox width={width || 10}/>
    );
};

const GreyBox = (props) => {
    return (
        <div style={{paddingTop: 1}}>
            <div style={{backgroundColor: "lightgrey", color: "lightgrey", display: "inline-block", borderRadius: 3}}>
                {"L".repeat(props.width)}
            </div>
        </div>
    );
}

export {GreyBox};
export default GreyBoxed;
