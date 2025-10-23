import { createContext, useState } from "react"

export const CommentsContext = createContext()

export const CommentsProvider = ({ children }) => {
	const [comments, setComments] = useState([])

	const getAllComments = id => {
		fetch(`http://localhost:8088/comments?post=${id}`)
			.then(res => res.json())
			.then(setComments)
	}

	const createComment = body => {
		return fetch(`http://localhost:8088/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	// edit comment
	const editComment = (body, id) => {
		return fetch(`http://localhost:8088/comments/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	// get comment by id
	const getCommentById = id => {
		return fetch(`http://localhost:8088/comments/${id}`).then(res =>
			res.json()
		)
	}

	return (
		<CommentsContext.Provider
			value={{
				getAllComments,
				comments,
				createComment,
				getCommentById,
				editComment
			}}>
			{children}
		</CommentsContext.Provider>
	)
}
