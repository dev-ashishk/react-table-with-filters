const headers = [{
    display_name: "ID",
    key: "id",
    sortable: true,
    type: "number"
}, {
    display_name: "PNR",
    key: "pnr",
    sortable: false,
    clickable: true
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

export default headers;
