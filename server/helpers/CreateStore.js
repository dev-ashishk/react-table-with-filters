import { store } from "../../config";

const getUrl = () => {
    return `${process.env.HOST_ADDR || "http://localhost"}:${process.env.PORT || 3000}`;
};

export default (req) => store({}, process.env.NODE_ENV, req.headers.cookie, getUrl());
