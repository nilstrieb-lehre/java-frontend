import {useRef, useState} from "react";

const Post = () => {
    const [data, setData] = useState(undefined);

    const name = useRef(null);
    const message = useRef(null);
    const display = useRef(null);

    function handleData(e) {
        e.preventDefault();
        if (name.current.value && message.current.value && display.current.value) {
            setData({
                name: name.current.value,
                message: message.current.value,
                display: display.current.value
            });
        } else {
            setData(undefined);
        }
    }

    return (
        <div>
            <h2>Post</h2>
            <form onSubmit={handleData}>
                <label htmlFor="name-input">Name:</label>
                <input ref={name} style={{display: "block"}} id="name-input"/>
                <label htmlFor="message-area">Message:</label>
                <textarea ref={message} style={{display: "block"}} id="message-area"/>
                <select ref={display}>
                    <option value="showMail">E-Mail-Adresse anzeigen</option>
                    <option value="showNickname">Nickname anzeigen</option>
                    <option value="showNone">keine Anzeige</option>
                </select>
                <br/>
                <input type="submit"/>
            </form>
            {data && <div style={{fontSize: 20}}>
                <div>Name: {data.name}</div>
                <div>Message: {data.message}</div>
                <div>Display Options: {data.display}</div>

            </div>
            }
        </div>
    )
}

export default Post;