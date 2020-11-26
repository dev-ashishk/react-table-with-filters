import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchList } from "../../actions";
import {
    Table,
    PaginationButton,
    DateRangePicker,
    SearchBox,
    Drawer
} from "../../components";

const parseQueryString = (str) => {
    if (!str) return {};
    // remove ? from start of the string
    const varStrings = str.slice(1);
    const values = varStrings.split("&");
    return values.reduce((acc, val) => {
        const a = val.split("=");
        return {
            ...acc,
            [a[0]]: a[1]
        };
    }, {});
};


class Home extends Component {
    constructor(props) {
        super(props);
        const count = 10;
        const pagination = this.paginate(props.list, count);
        this.state = {
            count,
            list: props.list,
            pagination,
            maxPage: pagination.length,
            currPage: 1,
            selected: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { search } = props.location;
        const qParams = parseQueryString(search);
        try {
            if (qParams.page && (parseInt(qParams.page, 10) !== parseInt(state.currPage, 10))) {
                return {
                    currPage: qParams.page
                };
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    paginate = (arr, size) => arr.reduce((acc, val, i) => {
        const idx = Math.floor(i / size);
        const page = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
    }, []);

    getFlatPaginationList = () => this.state.pagination.reduce((acc, arr) => {
        acc = [
            ...acc,
            ...arr
        ];
        return acc;
    }, [])

    sortBy = (key, order, type) => {
        const sorted = this.getFlatPaginationList().sort((a, b) => {
            if (type === "number") {
                return order === "ASC" ? a[key] - b[key] : b[key] - a[key];
            }
            if (order === "ASC") {
                return a[key].localeCompare(b[key]);
            }
            return b[key].localeCompare(a[key]);
        });
        this.updatePaginated(sorted);
    }

    componentDidMount() {
        this.props.fetchList();
    }

    getCurrentList = () => {
        const { currPage, pagination } = this.state;
        const activePage = currPage >= 1 ? currPage - 1 : 0;
        return {
            list: pagination[activePage],
            page: activePage
        };
    }

    updatePaginated = (filteredData) => {
        const pagination = filteredData.length > 0 ? this.paginate(filteredData, this.state.count) : [[]];
        this.setState({
            currPage: 1,
            maxPage: pagination.length,
            pagination
        });
        this.props.history.push("/?page=1");
    }

    onDateFilter = (startDate, endDate) => {
        const filteredData = this.state.list.reduce((acc, item) => {
            const d = new Date(parseInt(item.doj, 10)).setHours(0, 0, 0, 0);
            if (d >= startDate.getTime() && d <= endDate.getTime()) {
                acc.push(item);
            }
            return acc;
        }, []);
        this.updatePaginated(filteredData);
    }

    onSelected = (e, result) => {
        this.setState({
            selected: result
        });
    }

    onSearch = (list = []) => {
        this.updatePaginated(list);
    }

    resetSelected = () => {
        this.setState({
            selected: null
        });
    }

    render() {
        const { maxPage, currPage, list } = this.state;
        const data = this.getCurrentList();
        return (
            <div className="row">
                <div className="row" style={{ marginTop: "34px" }}>
                    <SearchBox
                        onSearch={this.onSearch}
                        data={list}
                        onSelected={this.onSelected}
                    />
                    <DateRangePicker onChange={this.onDateFilter}/>
                </div>
                <div className="row">
                    <main className="card">
                        <Table data={data.list} sortBy={this.sortBy} onClick={this.onSelected}/>
                    </main>
                </div>
                <div className="row">
                    <PaginationButton maxPage={maxPage} currPage={currPage}/>
                </div>
                <Drawer data={this.state.selected} onClose={this.resetSelected}/>
            </div>
        );
    }
}

const mapStateToProps = ({ list }) => ({
    list: list.data
});

export default connect(mapStateToProps, {
    fetchList
})(Home);
