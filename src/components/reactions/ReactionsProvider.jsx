import { createContext, useState } from "react"

export const ReactionsContext = createContext()

export const ReactionsProvider = ({ children }) => {
	const [postReactions, setPostReactions] = useState([])
	const [reactions, setReactions] = useState([])

	const getReactionsByPostId = id => {
		fetch(`http://localhost:8088/post-reaction/${id}`)
			.then(res => res.json())
			.then(setPostReactions)
	}

	const addPostReaction = postReaction => {
		return fetch(`http://localhost:8088/post-reaction`, {
			method: "POST",
			header: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postReaction)
		})
	}

	const createReaction = body => {
		return fetch(`http://localhost:8088/reactions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const getReactions = () => {
		return fetch(`http://localhost:8088/post-reaction`)
			.then(res => res.json())
			.then(setReactions)
	}

	return (
		<ReactionsContext.Provider
			value={{
				postReactions,
				getReactionsByPostId,
				createReaction,
				getReactions,
				reactions,
				addPostReaction
			}}>
			{children}
		</ReactionsContext.Provider>
	)
}
