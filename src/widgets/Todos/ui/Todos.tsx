import type { FC } from "react"
import type { TodoItem } from "../../../App"
import { useAppSelector } from "../../../app/redux/hooks"
import cls from './Todos.module.css'
import { useToggleTodoMutation } from "../../../app/api/todosAPI"

export const Todos: FC<TodosProps> = ({ todos, isLoading, isError }) => {
    const [toggleTodo, mutationState] = useToggleTodoMutation()

    const { currentPage } = useAppSelector(state => state.todos)

    const makeCurrentTodos = (todos: TodoItem[]): TodoItem[] => {
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10

        return todos.slice(startIndex, endIndex)
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        return <div>Something went wrong</div>;
    }
    return (
        <>
            {makeCurrentTodos(todos).map(todo => (
                <div className={cls.todoWrapper}
                    key={todo.id}
                    onClick={() => toggleTodo({
                        id: todo.id,
                        isDone: !todo.completed
                    })}
                >
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

interface TodosProps {
    todos: TodoItem[];
    isLoading: boolean;
    isError: boolean;
}