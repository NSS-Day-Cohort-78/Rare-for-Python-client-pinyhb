import { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([])
	const [post, setPost] = useState({})

	const getAllPosts = () => {
		fetch(`http://localhost:8088/posts`)
			.then(res => res.json())
			.then(setPosts)
	}

	const getPostById = id => {
		fetch(`http://localhost:8088/posts/${id}`)
			.then(res => res.json())
			.then(setPost)
	}

	const deletePost = id => {
		return fetch(`http://localhost:8088/posts/${id}`, {
			method: "DELETE"
		})
	}

	return (
		<PostContext.Provider
			value={{ posts, getAllPosts, getPostById, post, deletePost }}>
			{children}
		</PostContext.Provider>
	)
}

// export const getPostById = (id) => {
//     return fetch (`http://localhost:3000/edit-post/${id}`).then(res => res.json())
// }