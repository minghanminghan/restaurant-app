import { useState } from 'react';
import { useTheme } from './utils/ThemeContext.js';

import "./styles/App.css";

import Header from './components/Header.js';
import Main from "./components/Main.js";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";

// spa, render everything from here
export default function App ({}) {
    
    const {val, setVal} = useTheme();

    return(
        <div id="App" className={`${val}`}>
        {/* may need to distribute val */}
            <Header/>
            <Main />
            <NavBar />
            <Footer />
        </div>
    );    
}