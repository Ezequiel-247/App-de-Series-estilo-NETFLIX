import React from "react";
import "../style/Footer.css";
import githubIcon from "../multimedia/github.svg";
import linkedinIcon from "../multimedia/linkedin.svg";

const Footer = () => {
    return (
        <footer className="footer">
            {/* Izquierda */}
            <div className="footer-left">
                <p>
                    Desarrollado por: <strong>Eduardo Ezequiel Ortiz</strong> ®
                </p>
            </div>

            {/* Derecha */}
            <div className="footer-right">
                <span>Mis redes:</span>
                <div className="social-icons">
                    <a href="https://github.com/Ezequiel-247" target="_blank" rel="noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.linkedin.com/in/eduardo-ezequiel-ortiz-7815a526b/" target="_blank" rel="noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
