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

	return (
		<CommentsContext.Provider
			value={{ getAllComments, comments, createComment }}>
			{children}
		</CommentsContext.Provider>
	)
}
