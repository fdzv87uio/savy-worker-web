import axios from "axios";

export async function getIpData() {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data;
};