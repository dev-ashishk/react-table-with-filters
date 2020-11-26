import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class PaginationButton extends Component {
    render() {
        let { currPage, maxPage } = this.props;
        currPage = parseInt(currPage, 10);
        maxPage = parseInt(maxPage, 10);
        return (
            <React.Fragment>
                <Link
                    to={`/?page=${currPage >= 1 ? currPage - 1 : 0}`}
                    className={`${currPage === 1 ? "disabled" : ""} nav-btn text-orange`}
                >
                    Previous
                </Link>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <Link
                    to={`/?page=${(currPage >= 0 && currPage < maxPage) ? currPage + 1 : maxPage}`}
                    className={`${currPage === maxPage ? "disabled" : ""} nav-btn text-orange`}
                >
                    Next
                </Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, {
})(PaginationButton));
