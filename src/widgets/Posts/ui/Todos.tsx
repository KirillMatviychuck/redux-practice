import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks"


import cls from './Todos.module.css'
import { getAllTodos, type TodoItem } from "../../../app/redux/slices/todosSlice"
import { selectTodosByFilter } from "../../../shared/selectors/selectTodosByFilter"

export const Todos = () => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(selectTodosByFilter)
    const { currentPage } = useAppSelector(state => state.todos)
    const { status } = useAppSelector(state => state.status)
    useEffect(() => {
        dispatch(getAllTodos())
    }, [])

    const makeCurrentTodos = (todos: TodoItem[]): TodoItem[] => {
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10

        return todos.slice(startIndex, endIndex)
    }

    if (status === 'loading') return <div>Loading...</div>

    return (
        <>
            {makeCurrentTodos(todos).map(todo => (
                <div className={cls.postWrapper} key={todo.id}>
                    <div>
                        {todo.completed
                            ? <div className={cls.done}></div>
                            : <div className={cls.active}></div>}
                    </div>
                    <div>{todo.title}</div>
                </div>
            ))}
        </>
    )
}
