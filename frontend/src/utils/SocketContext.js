import { useContext, createContext, useState } from "react";
import { socket } from "./socket.js";

export const SocketContext = createContext();

const SocketProvider = ({children}) =>{

    const [conn, setConn] = useState(0);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState({
        connections: 0,
        items: [],
        cost: 0
    });
    const sock = {
        conn: conn,
        menu: menu,
        order: order
    }

    socket.on("welcome", cache => {
        console.log(cache);
        setMenu(cache.menu);
        setOrder(cache.order);
    });

    socket.on("conn", num => {
        setConn(num);
    });

    socket.on("select", select => {
        console.log(select);
        setOrder(select); 
    });


    return (
        <SocketContext.Provider value={sock}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;