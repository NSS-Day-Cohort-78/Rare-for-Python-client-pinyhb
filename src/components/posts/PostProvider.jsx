import { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([])
	const [post, setPost] = useState({})
	const [postTags, setPostTags] = useState([])

	const getAllPosts = () => {
		return fetch(`http://localhost:8088/posts`)
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
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedPost)
		})
	}

	const getPostTagById = id => {
		return fetch(`http://localhost:8088/post-tags/${id}`).then(res =>
			res.json()
		)
	}

	const getAllPostTags = () => {
		return fetch(`http://localhost:8088/post-tags`)
			.then(res => res.json())
			.then(setPostTags)
	}

	const approvePost = (id, body) => {
		return fetch(`http://localhost:8088/approval/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const addNewPost = async (post) => {
		const response = await fetch("http://localhost:8088/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
			body: JSON.stringify(post)
		})
		const data = await response.json()
		return data
	}

	const getAllCategories = () => {
		return fetch(`http://localhost:8088/categories`).then(res => res.json())
	}

	const uploadImage = async (img) => {
		const response = await fetch(`https://api.imgbb.com/1/upload?key=fa084ec67f83084b83b832c6d2ecf844`, {
			method: "POST",
			body: img
		})
		const url = await response.json()
		return url
	}


	return (
		<PostContext.Provider
			value={{
				posts,
				getAllPosts,
				getPostById,
				post,
				deletePost,
				updatePost,
				getPostTagById,
				getAllPostTags,
				postTags,
				approvePost,
				addNewPost,
				getAllCategories,
				uploadImage
			}}>
			{children}
		</PostContext.Provider>
	)
}
