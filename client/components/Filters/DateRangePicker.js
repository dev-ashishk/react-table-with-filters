/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { DateRange } from "react-date-range";
import { Portal } from "../index";

class DateRangeFilter extends Component {
    state = {
        show: false,
        ranges: {
            startDate: null,
            endDate: null,
            key: "selection"
        }
    }

    onChange = ({ selection }) => {
        this.setState({
            ranges: {
                startDate: isNaN(selection.startDate.getTime()) ? null : selection.startDate,
                endDate: isNaN(selection.endDate.getTime()) ? null : selection.endDate,
                key: selection.key
            }
        }, () => {
            if (this.props.onChange && this.state.ranges.startDate && this.state.ranges.endDate) {
                this.props.onChange(this.state.ranges.startDate, this.state.ranges.endDate);
            }
        });
    }

    togglePicker = () => {
        this.setState({
            show: !this.state.show
        });
    }

    getDateFormat = (date) => {
        if (!date) return null;
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    render() {
        const { startDate, endDate } = this.state.ranges;
        return (
            <React.Fragment>
                <div className="filter">
                    <button
                        type="button"
                        style={{ marginLeft: "0px" }}
                        className="btn btn-filter"
                        onClick={this.togglePicker}
                    >
                        {
                            startDate || endDate ? `${this.getDateFormat(startDate)} - ${this.getDateFormat(endDate)}` : "Select Date Range"
                        }
                    </button>
                </div>
                {
                    this.state.show
                        ? <Portal closePortal={this.togglePicker}>
                            <DateRange
                                showDateDisplay
                                editableDateInputs={true}
                                onChange={this.onChange}
                                moveRangeOnFirstSelection={true}
                                ranges={[this.state.ranges]}
                            />
                        </Portal> : ""
                }
            </React.Fragment>
        );
    }
}
export default DateRangeFilter;
