import { useSelect } from "../utils/SelectContext";

export default function MenuItem ({ item, increment, decrement }) {
    // display icon (need to design passing image from backend, maybe pass url to fetch)
    // rate limit: freeze after +/- press

    // create usecontext with socket to calculate order amount
    return (
        <div id="MenuItem" className={`MenuItem row wrapper`}>
            {/* <button onClick={handler} className="MenuItem order">Order</button> */}
            <span className="row wrapper">
                <button onClick={increment}>+</button>
                <p>{useSelect(item.id)}</p>
                <button onClick={decrement}>-</button>
            </span>
            <img src={item.src} alt={item.src} />
            <p className="MenuItem cost">${item.cost}</p>
            <p className="MenuItem name">{item.name}</p>
            <p className="MenuItem desc">{item.desc}</p>
        </div>
    );
}