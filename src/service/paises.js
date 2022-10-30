import axios from "axios";

const http = axios.create({
    baseURL: "https://amazon-api.sellead.com/country",
    headers: {
        "Content-type": "application/json"
    }
});

export const getCoumtries = async () => {
    const data = await http.get('/',{})
    return data.data
    
}
