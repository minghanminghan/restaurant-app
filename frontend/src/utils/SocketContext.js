import { useContext, createContext, useState } from "react";
import { socket } from "./socket.js";

export const SocketContext = createContext();

const SocketProvider = ({children}) =>{

    const [conn, setConn] = useState(0);
    const [menu, setMenu] = useState({});
    const [select, setSelect] = useState({});
    const [order, setOrder] = useState({});
    const sock = {
        conn: conn,
        menu: menu,
        select: select,
        order: order
    }

    // socket interface
    socket.on("welcome", cache => {
        setConn(cache.conn);
        setMenu(cache.menu);
        setSelect(cache.select);
        setOrder(cache.order);
    });

    socket.on("conn", num => {
        setConn(num);
    });

    socket.on("select", select => {
        setSelect(select); 
    });

    socket.on("order", (order, select) => {
        setOrder(order);
        setSelect(select);
    })


    return (
        <SocketContext.Provider value={sock}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;