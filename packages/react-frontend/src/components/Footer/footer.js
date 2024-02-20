import React from "react";
import "../../styles/footer.css"

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <hr />
                <div className="row">
                    <p className="col-small">
                        &copy;{new Date().getFullYear()} KEVIN <sup>TM</sup> &nbsp;|&nbsp; All right reserved &nbsp;|&nbsp; Terms of Service &nbsp;|&nbsp; Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;