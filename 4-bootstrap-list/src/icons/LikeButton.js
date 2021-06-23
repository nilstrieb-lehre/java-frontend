import React, {useState} from 'react';
import {Heart, HeartFill} from "react-bootstrap-icons";

const LikeButton = props => {
    const [checked, setChecked] = useState(props.checked);

    return (
        <div onClick={() => {
            props.onChange(!checked);
            setChecked(c => !c);
        }}>
            {
                checked ?
                    <HeartFill/>
                    :
                    <Heart/>
            }
        </div>
    );
};

export default LikeButton;