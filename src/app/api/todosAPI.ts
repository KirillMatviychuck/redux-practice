import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TodoItem } from '../../App'


export const todosApi = createApi({
    reducerPath: 'todosApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),

    endpoints: builder => ({
        getAllTodos: builder.query<TodoItem[], void>({
            query: () => 'todos',
        }),
        toggleTodo: builder.mutation<
            TodoItem,
            { id: number; isDone: boolean }
        >({
            query: ({ id, isDone }) => ({
                url: `todos/${id}`,
                method: 'PATCH',
                body: {
                    completed: isDone,
                },
            }),

            async onQueryStarted(
                { id, isDone },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    todosApi.util.updateQueryData(
                        'getAllTodos',
                        undefined,
                        draft => {
                            const todo = draft.find(todo => todo.id === id)

                            if (todo) {
                                todo.completed = isDone
                            }
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
    }),
})

export const {
    useToggleTodoMutation,
    useGetAllTodosQuery,
} = todosApi