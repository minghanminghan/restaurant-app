import { useState } from 'react';
import { socket } from '../utils/socket.js';
import MenuItem from "./MenuItem.js";

export default function Main ({  }) {

    const [displayMenu, setDisplayMenu] = useState([]);

    socket.on('welcome', (cache) => { // cache={menu, select, order, count}
        console.log(cache);
        let tmp = [];
        Object.values(cache.menu).forEach((v, i) => {
            tmp.push(<MenuItem item={v} key={i} 
                increment={() => socket.emit("select", v.id)}
                decrement={() => socket.emit("deselect", v.id)}
            />)
        });
        setDisplayMenu(tmp);
    });

    return (
        <div className={`Main`} id="Main">
            {/* make columns clear to users */}
            { displayMenu }
        </div>
    );
}