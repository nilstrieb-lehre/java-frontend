import React, {useState} from 'react';

const Lists = () => {
    const [colors, setColors] = useState([
        {title: 'red', red: 255, green: 0, blue: 0},
        {title: 'green', red: 0, green: 255, blue: 0},
        {title: 'blue', red: 0, green: 0, blue: 255}
    ]);

    function newColor() {
        const color = {
            title: randomWordGenerator(),
            red: randomByteValue(),
            green: randomByteValue(),
            blue: randomByteValue()
        };
        setColors(c => [...c, color]);
    }

    return (
        <div>
            <h2>Colors</h2>
            <button onClick={newColor}>neue farbe</button>
            <ul>
                {colors.map((color, i) =>
                    <li style={{color: colorToHex(color)}} key={i}>{color.title} {colorToHex(color)}</li>
                )}
            </ul>
        </div>
    );
};

const randomByteValue = () => randomValue(0, 256);

const randomValue = (from, to) => Math.floor(Math.random() * (to - from)) + from;

const colorToHex = color => "#" +
    color.red.toString(16).padStart(2, "0") +
    color.green.toString(16).padStart(2, "0") +
    color.blue.toString(16).padStart(2, "0");

export default Lists;


function randomWordGenerator() {
    const partAmount = randomValue(2, 10);
    const firstPart = Math.random() > 0.5 ? 1 : 0;
    const word = Array(partAmount).fill(0).map((_, i) => {
            return (i % 2 === firstPart) ? randomVowel() : randomConsonant()
        }
    ).join("");
    console.log(word)
    return word;
}


function randomVowel() {
    const arr = ['a', 'e', 'i', 'o', 'u'];
    const double = ['eu', 'ou', 'au', 'eo', 'io', 'oi', 'ie', 'ei'];
    return Math.random() > 0.8 ? double[randomValue(0, double.length)] : arr[randomValue(0, arr.length)];
}

function randomConsonant() {
    const arr = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    const double = ['rr', 'rk', 'pl', 'pr', 'bl', 'br', 'mm', 'cl'];
    return Math.random() > 0.8 ? double[randomValue(0, double.length)] : arr[randomValue(0, arr.length)];
}