import './App.css'
import { useGetAllTodosQuery } from './app/api/todosAPI/todosAPI'

import { Paginator } from './widgets/Paginator/ui/Paginator'
import { Todos } from './widgets/Todos'



function App() {
  const {
    data: todos = [],
    isLoading,
    isError
  } = useGetAllTodosQuery()
  const calculateTotalPages = (totalTodos: TodoItem[]) => {
    return Math.ceil(totalTodos.length / 10)
  }

  const totalPages = calculateTotalPages(todos)
  return (
    <>
      <Todos todos={todos} isLoading={isLoading} isError={isError} />
      <Paginator totalPages={totalPages} />
    </>
  )
}

export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default App