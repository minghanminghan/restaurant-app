import { useState, useContext } from "react";
import { socket } from "../utils/socket.js";
import { useTheme } from "../utils/ThemeContext.js";

// store connections, contact
export default function Footer ({  }) {

    const {val, setVal} = useTheme();
    const [conn, setConn] = useState(0);
    const [id, setId] = useState('');
    const [select, setSelect] = useState([]);

    socket.on('connect', () => {
        setId(socket.id);
    });

    socket.on('conn', (num) => {
        setConn(num);
    });


    return (
        <div className="Footer row wrapper meta" id="Footer">
            <form>
                <label htmlFor="theme">Theme: </label>
                <select id="theme" defaultValue={val} onInput={(e) => {
                    //console.log(val);
                    setVal(e.target.value);
                }}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </form>
            <p>Connections: {conn}</p>
            <p>Client ID: {id}</p>
            <b><a href="https://github.com/minghanminghan">Contact</a></b>
        </div>
    );
}