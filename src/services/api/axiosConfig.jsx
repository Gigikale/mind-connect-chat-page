import axios from 'axios';



// export const BASE_URL = "https://mind-connect-api.decagon.dev";

 export const BASE_URL = "http://localhost:8020";



export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})
