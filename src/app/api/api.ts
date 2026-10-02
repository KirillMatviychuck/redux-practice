import axios from "axios";
import type { TodoItem } from "../../App";


const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const todoAPI = {
    getAll() {
        return instance.get<TodoItem[]>('/todos')
    }
}