import axios from "axios";
import { getConfig } from "../init.js";

const config = getConfig();
const apiClient = axios.create({
    baseURL: config.shoppeUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.partnerId}`,
    },
});

export { apiClient };