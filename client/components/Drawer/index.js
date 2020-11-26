import React, { Component } from "react";
import headers from "../constants";
import { Portal } from "../index";

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: !!props.data,
            data: props.data
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
            return {
                ...state,
                show: !!props.data
            };
        }
        return null;
    }

    closeDrawer = () => {
        this.props.onClose();
        this.setState({
            show: false,
            data: null
        });
    }

    render() {
        const { data } = this.props;
        if (!this.state.show) {
            return null;
        }
        return (
            <Portal>
                <div className="drawer">
                    <button className="close-btn--drawer" type="button" onClick={this.closeDrawer}>&#215;</button>
                    {
                        headers.map((head, i) => (
                            <div className="info-group" key={i}>
                                <label>{head.display_name}</label>
                                <p>
                                    {
                                        data[head.key] instanceof Array ? data[head.key].join(", ") : data[head.key]
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </Portal>
        );
    }
}

export default Drawer;
