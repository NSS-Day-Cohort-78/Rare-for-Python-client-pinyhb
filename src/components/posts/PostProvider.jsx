import { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState()

	const getAllPosts = () => {
		fetch(`http://localhost:8088/posts`)
			.then(res => res.json())
			.then(setPosts)
	}

	return (
		<PostContext.Provider value={{ posts, getAllPosts }}>
			{children}
		</PostContext.Provider>
	)
}
