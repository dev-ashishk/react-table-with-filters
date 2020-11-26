import React, { Component } from "react";
import ReactDOM from "react-dom";


class Portal extends Component {
    constructor(props) {
        super(props);
        this.portalRoot = document.getElementById("portal-root");
        this.el = document.createElement("div");
        this.el.classList.add("portal");
    }

    closePortal = ({ target }) => {
        if (this.portal && !this.portal.contains(target)) {
            this.props.closePortal();
        }
    }

    componentDidMount() {
        this.portalRoot.appendChild(this.el);
        if (this.props.closePortal) {
            document.addEventListener("click", this.closePortal, false);
        }
    }

    componentWillUnmount() {
        this.portalRoot.removeChild(this.el);
        if (this.props.closePortal) {
            document.removeEventListener("click", this.closePortal, false);
        }
    }

    render() {
        return ReactDOM.createPortal(
            <div ref={(node) => {
                this.portal = node;
            }} className="portal-body">
                { this.props.children }
            </div>,
            this.el
        );
    }
}

export default Portal;
