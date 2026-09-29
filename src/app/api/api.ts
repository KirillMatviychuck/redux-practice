import axios from "axios";
import type { TodoItem } from "../redux/slices/todosSlice";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const todosAPI = {
    getAll() {
        return instance.get<TodoItem[]>('/todos')
    }
}