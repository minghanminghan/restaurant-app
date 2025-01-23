

export default function Header() {


    return (
        <div id="Header" className="Header row wrapper meta">
            <img src={process.env.REACT_APP_BACKEND_URL + "/static/logo.jpg"} alt="Logo"/>
            <p>Restaurant name</p>
        </div>
    );
}