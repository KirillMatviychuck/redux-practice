import { setActive, setAll, setDone, setPage, todosReducer } from "./todosSlice"
import { describe, it, expect } from 'vitest'
describe('todosSlice', () => {
    it('setPage changes currentPage', () => {
        const reducer = todosReducer(undefined, setPage(2))
        console.log(reducer)
        expect(reducer.currentPage).toBe(2)
    })
    it('setActive change filter on actvive status', () => {
        const reducer = todosReducer(undefined, setActive())

        expect(reducer.filter).toBe('active')
    })
    it('setAll change filter on actvive status', () => {
        const reducer = todosReducer(undefined, setAll())

        expect(reducer.filter).toBe('all')
    })
    it('setDone change filter on actvive status', () => {
        const reducer = todosReducer(undefined, setDone())

        expect(reducer.filter).toBe('done')
    })
})