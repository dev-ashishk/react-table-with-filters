import React, { useState } from "react";
import headers from "../constants";

const getdate = (date) => {
    const d = new Date(parseInt(date, 10));
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const TableHead = ({ head, sortBy }) => {
    const [order, setOrder] = useState("ASC");
    return (
        <th
            title={head.sortable ? "Click to sort column" : ""}
            className={head.sortable ? "sortable" : ""}
            onClick={ head.sortable ? () => {
                sortBy(head.key, order, head.type);
                setOrder(order === "ASC" ? "DESC" : "ASC");
            } : null}
        >
            {
                head.display_name
            }
            {
                head.sortable
                    ? <React.Fragment>
                        {
                            order === "ASC" ? <span className="sort-icon">&#x2191;</span> : <span className="sort-icon">&#x2193;</span>
                        }</React.Fragment> : ""
            }
        </th>
    );
};

const Table = ({ data, sortBy, onClick }) => (
    <table>
        <thead>
            <tr>
                {
                    headers.map((head, i) => <TableHead key={i} head={head} sortBy={sortBy}/>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row, i) => (
                    <tr key={i}>
                        {
                            headers.map((head, j) => (
                                <td
                                    className={`${head.clickable ? "clickable" : ""}`}
                                    onClick={head.clickable ? (e) => onClick(e, {
                                        ...row,
                                        passengers: row.passengers.map((p) => p.name)
                                    }) : null}
                                    key={j}
                                >
                                    {
                                        // eslint-disable-next-line no-nested-ternary
                                        row[head.key] instanceof Array ? row[head.key].length : (head.key === "doj" ? getdate(row[head.key]) : row[head.key])
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
);
export default Table;
