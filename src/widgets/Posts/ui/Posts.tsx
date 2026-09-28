import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks"
import { getAllPosts } from "../../../app/redux/slices/posts/postsSlice"

import cls from './Posts.module.css'

export const Posts = () => {
    const dispatch = useAppDispatch()
    const { posts } = useAppSelector(state => state.posts)
    const { status } = useAppSelector(state => state.status)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    if (status === 'loading') return <div>Loading...</div>

    return (
        <>
            {posts.map(post => (
                <div className={cls.postWrapper} key={post.id}>
                    <div>{post.title}</div>
                    <div>{post.body}</div>
                </div>
            ))}
        </>
    )
}
