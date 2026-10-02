import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks"
import { setPage } from "../../../app/redux/slices/todosSlice"

import cls from './Paginator.module.css'

export const Paginator: FC<PaginatorProps> = ({ totalPages }) => {
    const dispatch = useAppDispatch()
    const { currentPage } = useAppSelector(state => state.todos)
    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    const changePage = (page: number) => dispatch(setPage(page))

    return (
        <div className={cls.paginatorWrapper}>
            {pages.map(page => (
                <div key={page}
                    className={currentPage === page ? `${cls.page} ${cls.activePage}` : cls.page}
                    onClick={() => changePage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    )
}

interface PaginatorProps {
    totalPages: number
}