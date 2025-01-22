import { useState, useEffect } from "react";
import { socket } from "../utils/socket.js";

export default function NavBar({  }) {

    const [select, setSelect] = useState({});
    const [order, setOrder] = useState({});

    socket.on("cache", (cache) => {
        setSelect(cache.select);
        console.log(cache.select);
    });

    socket.on("select", (obj) => {
        console.log(obj);
        setSelect(obj);
    });

    return (
        <div id="NavBar" className={`NavBar row wrapper`}>
            <button>Checkout ({select.count})</button>
            <p>${select.cost}</p>
        </div>
    );
}