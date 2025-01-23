import { useState, useContext } from 'react';
import { SocketContext } from '../utils/SocketContext.js';
import { select, deselect } from '../utils/socket.js';
import MenuItem from "./MenuItem.js";

export default function Main ({  }) {

    const sock = useContext(SocketContext);
    const displayMenu = Object.values(sock.menu).map((v, i) => { // on load
        return <MenuItem item={v} key={i}
            increment={() => select(v.id)}
            decrement={() => deselect(v.id)}
        />
    });

    return (
        <div className={`Main`} id="Main">
            <span className="row wrapper">
                <p>qty</p>
                <p>img</p>
                <p>cost</p>
                <p>name</p>
                <p>desc</p>
            </span>
            { displayMenu }
        </div>
    );
}