import { useState, useContext } from "react";
import { SocketContext } from "../utils/SocketContext";
import { order } from "../utils/socket";

export default function NavBar({  }) {

    const sock = useContext(SocketContext);
    const [show, setShow] = useState(true);

    // make overlay for View Ordered button
    return (
        <div id="NavBar" className={`NavBar row wrapper`}>
            <ViewOrder show={show} setShow={setShow} />
            <p>Total: ${sock.order.cost}</p>
            <button onClick={order}>Checkout ({Object.values(sock.order.items).reduce((acc, cur) => acc+cur, 0)})</button>
        </div>
    );
}

function ViewOrder({ show, setShow }) {

    const sock = useContext(SocketContext);

    return (
        <div id="ViewOrder" className={show ? 'hidden' : ''}>
            <p onClick={() => setShow(!show)} className="pointer">close [x]</p>
            <p>0: {sock.order[0]}</p>
            <p>1: {sock.order[1]}</p>
            <p>2: {sock.order[2]}</p>
            <p>count: {sock.order['count']}</p>
            <p>cost: {sock.order['cost']}</p>
        </div>
    );
}