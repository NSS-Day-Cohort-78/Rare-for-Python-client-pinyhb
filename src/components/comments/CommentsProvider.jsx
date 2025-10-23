import { createContext, useState } from "react"

export const CommentsContext = createContext()

export const CommentsProvider = ({ children }) => {
	const [comments, setComments] = useState([])

	const getAllComments = id => {
		fetch(`http://localhost:8088/comments?post=${id}`)
			.then(res => res.json())
			.then(setComments)
	}

	return (
		<CommentsContext.Provider value={{ getAllComments, comments }}>
			{children}
		</CommentsContext.Provider>
	)
}
