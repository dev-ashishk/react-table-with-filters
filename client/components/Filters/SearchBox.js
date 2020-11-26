import React, { Component } from "react";
import SelectableSearch from "@fliptask/react-search-dropdown";

class SearchBox extends Component {
    state = {
        open: false,
        search: ""
    }

    onChange = ({ list, search }) => {
        console.log("on Chnage", list, search);
        this.props.onSearch(list);
        this.setState({
            search
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

    getFilteredList = (list = []) => list.filter((option) => Object.keys(option).reduce((acc, key) => {
        let val = option[key];
        if (typeof val === "number") {
            val = `${val}`;
        }
        if (val.includes(this.state.search)) {
            acc = true;
        }
        return acc;
    }, false))

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
                    onChange={this.onChange}
                    onSelected={this.onSelect}
                    value={this.state.search}
                    options={updatedData}
                    searchKeys={["pnr", "passengers"]}
                />
            </div>
        );
    }
}
export default SearchBox;
