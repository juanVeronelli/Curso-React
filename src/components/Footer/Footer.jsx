import React from "react";
//static
import "./Footer.css"
//dependecies
//material UI
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
    <>
        <footer>
            <h3> Llive.</h3>
            <ul>
                <li><InstagramIcon /> juanveronellii</li>
                <li><GitHubIcon /> juanVeronelli </li>
            </ul>
        </footer>
    </>)
}

export default Footer