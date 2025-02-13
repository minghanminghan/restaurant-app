import { useState, useContext } from 'react';
import { SocketContext } from '../utils/SocketContext.js';
import { select, deselect } from '../utils/socket.js';
import MenuItem from "./MenuItem.js";

export default function Main ({  }) {

    const sock = useContext(SocketContext);

    const displayMenu = Object.values(Object.entries(sock.menu)).map(([i, v]) => { // on load
        return <MenuItem item={v} key={i} id={i}
            select={() => select(i)}
            deselect={() => deselect(i)}
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