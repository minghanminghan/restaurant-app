import { SocketContext } from "../utils/SocketContext.js";
import { useContext } from "react";

export default function MenuItem ({ item, id, select, deselect }) {
    // display icon (need to design passing image from backend, maybe pass url to fetch)
    // rate limit: freeze after +/- press
    
    const sock = useContext(SocketContext);

    return (
        <div id="MenuItem" className={`MenuItem row wrapper`}>
            {/* <button onClick={handler} className="MenuItem order">Order</button> */}
            <span className="MenuItem row wrapper left">
                <button onClick={select}>+</button>
                <p>{sock.order.items[id] ?? 0}</p>
                <button onClick={deselect}>-</button>
            </span>
            <span className="MenuItem row wrapper right">
                <img src={process.env.REACT_APP_BACKEND_URL + "/static/" + item.name + ".jpg"} />
                <p className="MenuItem cost">${item.cost}</p>
                <p className="MenuItem name">{item.name}</p>
                <p className="MenuItem desc">{item.desc}</p>
            </span>
        </div>
    );
}