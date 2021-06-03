import React from 'react';

function Lists() {
    const colors = ["red", "blurple"]
    return (
        <div>
            <h2>Colors</h2>
            <ul>
                {colors.map((color, i) => <li key={i}>{color}</li>)}
            </ul>
        </div>
    );
}

export default Lists;