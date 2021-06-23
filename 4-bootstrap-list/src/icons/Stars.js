import React, {useEffect, useState} from 'react';
import {Star, StarFill, StarHalf} from "react-bootstrap-icons";

const Stars = ({checked, length, onChange}) => {
        const [selectedAmount, setSelectedAmount] = useState(checked);

        const mapStarsToFillAmount = (_, i) => {
            if (i + 1 <= selectedAmount) {
                return 1;
            }

            if (selectedAmount > i && i === Math.floor(selectedAmount)) {
                return 0.5;
            }
            return 0;
        }

        const changeHandler = (i) => () => {
            let value = i + 1;

            if (selectedAmount === value) {
                value -= 0.5;
            }
            setSelectedAmount(value);
        }

        useEffect(() => {
            onChange(selectedAmount);
        }, [selectedAmount]);

        return (
            <div>
                {
                    Array(length)
                        .fill(0)
                        .map(mapStarsToFillAmount)
                        .map((amount, i) => {
                            if (amount === 0) {
                                return <Star key={i} onClick={changeHandler(i)}/>
                            }
                            if (amount === 0.5) {
                                return <StarHalf key={i} onClick={changeHandler(i)}/>
                            }
                            return <StarFill key={i} onClick={changeHandler(i)}/>
                        })
                }
            </div>
        );
    }
;

export default Stars;