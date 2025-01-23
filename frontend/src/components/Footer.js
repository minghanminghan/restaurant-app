import { useState, useContext } from "react";
import { SocketContext } from "../utils/SocketContext.js";
import { useTheme } from "../utils/ThemeContext.js";

// store connections, contact
export default function Footer ({  }) {

    const {val, setVal} = useTheme();
    const sock = useContext(SocketContext);

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
            <p>Connections: {sock.conn}</p>
            <b><a href="https://github.com/minghanminghan">Contact</a></b>
        </div>
    );
}