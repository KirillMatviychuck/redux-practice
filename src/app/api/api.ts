import axios from "axios";
import type { Post } from "../redux/slices/posts/postsSlice";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const postsAPI = {
    getAll() {
        return instance.get<Post[]>('/posts')
    }
}