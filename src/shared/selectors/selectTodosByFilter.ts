import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../../app/redux/store"


export const selectTodosByFilter = createSelector(
  [
    (state: RootState) => state.todos.todos,
    (state: RootState) => state.todos.filter
  ],

  (todos, filter) => {
    switch (filter) {
      case 'all':
        return todos

      case 'active':
        return todos.filter(todo => !todo.completed)

      case 'done':
        return todos.filter(todo => todo.completed)
    }
  }
)