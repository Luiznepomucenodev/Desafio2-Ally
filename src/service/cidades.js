import axios from "axios";

const http = axios.create({
    baseURL: "https://amazon-api.sellead.com/city",
    headers: {
        "Content-type": "application/json"
    }
});

export const getCity = async () => {
    const data = await http.get('/',{})
    return data.data
}
