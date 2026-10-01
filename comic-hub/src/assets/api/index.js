import axios from "../../utils/request";
import base from "./base"

const api = {
    getComicPage(chapterCode){
        return axios.get(base.baseUrl+base.comicPage+chapterCode);
    },
    getApiTest(){
        return axios.get("https://jsonplaceholder.typicode.com/posts/1");
    }
}

export default api;