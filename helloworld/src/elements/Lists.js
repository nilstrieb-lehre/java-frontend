import React, {useRef, useState} from 'react';

const Lists = () => {
    const [colors, setColors] = useState(["red", "blurple"]);

    const newColorInput = useRef(null);

    return (
        <div>
            <h2>Colors</h2>
            <ul>
                {colors.map((color, i) =>
                    <li key={i}>{color}</li>
                )}
            </ul>
            <input ref={newColorInput}/>
            <button onClick={() => setColors(c => [...c, newColorInput.current.value])}>neue farbe</button>
        </div>
    );
};

export default Lists;