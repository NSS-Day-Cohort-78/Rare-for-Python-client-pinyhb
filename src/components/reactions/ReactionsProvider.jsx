import { createContext, useState } from "react"

export const ReactionsContext = createContext()

export const ReactionsProvider = ({ children }) => {
	const [postReactions, setPostReactions] = useState([])

	const getReactionsByPostId = id => {
		fetch(`http://localhost:8088/post-reactions/${id}`)
			.then(res => res.json())
			.then(setPostReactions)
	}

	return (
		<ReactionsContext.Provider
			value={{ postReactions, getReactionsByPostId }}>
			{children}
		</ReactionsContext.Provider>
	)
}
