import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="footer-inner">
                <div>&copy; {currentYear} ProRoadmaps. All rights reserved.</div>
                <nav aria-label="Footer navigation">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/About">About Us</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;