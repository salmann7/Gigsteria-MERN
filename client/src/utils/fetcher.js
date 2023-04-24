import axios from "axios";

const fetcher = async ( url, headers = {}) => {
    try {
        const { data } = await axios.get(url, {
            headers,
            withCredentials: true
        })
    } catch(e) {
        return null;
    }
}

export default fetcher;