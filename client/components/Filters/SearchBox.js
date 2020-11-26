import React, { Component } from "react";
import SelectableSearch from "@fliptask/react-search-dropdown";

class SearchBox extends Component {
    state = {
        open: false,
        search: ""
    }

    onChange = (e) => {
        e.stopPropagation();
        this.setState({
            search: this.state.search + e.target.value
        });
    }

    onFocus = () => {
        this.setState({
            open: true
        });
    }

    onBlur = () => {
        this.setState({
            open: false
        });
    }

    onSelect = (e, data) => {
        this.onBlur();
        this.props.onSelected(e, data);
    }

    render() {
        const { data } = this.props;
        const updatedData = data.map((obj) => {
            if (obj.passengers.length > 0) {
                return {
                    ...obj,
                    passengers: obj.passengers.reduce((acc, o) => {
                        acc.push(o.name);
                        return acc;
                    }, [])
                };
            }
            return obj;
        });
        return (
            <div className="filter col-4 col-md-6 col-xs-12" style={{ paddingLeft: "0px" }}>
                <SelectableSearch
                    value={this.state.search}
                    onSelected={this.onSelect}
                    options={updatedData}
                    searchKeys={["pnr", "passengers"]}
                />
            </div>
        );
    }
}
export default SearchBox;
