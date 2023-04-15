import axios from "axios";

export const getPodcastMinutes = async(id) => {

        const {data} = await axios.get(`/api/${id}`)
  
        return data 
}
