import React, { useState } from "react";

const headers = [{
    display_name: "",
    key: "id",
    sortable: true,
    type: "number"
}, {
    display_name: "PNR",
    key: "pnr",
    sortable: false
}, {
    display_name: "From",
    key: "from",
    sortable: true
}, {
    display_name: "Destination",
    key: "destination",
    sortable: true
}, {
    display_name: "Journey Date",
    key: "doj",
    type: "number",
    sortable: true
}, {
    display_name: "No. of Passengers",
    key: "passengers"
}, {
    display_name: "Contact",
    key: "contact"
}, {
    display_name: "Total",
    key: "total_amount"
}];

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

const Table = ({ data, sortBy }) => (
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
                            headers.map((head, j) => <td key={j}>{
                                // eslint-disable-next-line no-nested-ternary
                                row[head.key] instanceof Array ? row[head.key].length : (head.key === "doj" ? getdate(row[head.key]) : row[head.key])
                            }</td>)
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
);
export default Table;
