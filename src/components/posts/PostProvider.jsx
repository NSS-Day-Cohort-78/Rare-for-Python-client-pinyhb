import { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([])
	const [post, setPost] = useState({})
	const [postTags, setPostTags] = useState([])

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

	const updatePost = updatedPost => {
		return fetch(`http://localhost:8088/posts/${updatedPost.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedPost)
		})
	}

	const getPostTagById = id => {
		return fetch(`http://localhost:8088/post-tags/${id}`)
			.then(res => res.json())
	}

	const getAllPostTags = () => {
		return fetch(`http://localhost:8088/post-tags`)
			.then(res => res.json())
			.then(setPostTags)
	}

	return (
		<PostContext.Provider
			value={{ posts, getAllPosts, getPostById, post, deletePost, updatePost, getPostTagById, getAllPostTags, postTags }}>
			{children}
		</PostContext.Provider>
	)
}

export const getAllCategories = () => {
	return fetch(`http://localhost:8088/categories`)
		.then(res => res.json())
}

