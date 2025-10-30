import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ReactionsContext } from "./ReactionsProvider"
import "./reactions.css"

export const ViewPostReactions = () => {
	const { postReactions, getReactionsByPostId } = useContext(ReactionsContext)
	const { addPostReaction, deletePostReaction } = useContext(ReactionsContext)
	const { id } = useParams()

	const handleSaveReaction = selectedReaction => {
		const userId = localStorage.getItem("auth_token")
		const reactionToSave = {
			user_id: parseInt(userId),
			reaction_id: selectedReaction.id,
			post_id: parseInt(id)
		}

		const alreadyReacted = postReactions.some(
			postReactions =>
				postReactions.post_reactions.user_id ===
					reactionToSave.user_id &&
				postReactions.post_reactions.post_id === reactionToSave.post_id
		)

		if (!alreadyReacted) {
			addPostReaction(reactionToSave).then(() => {
				getReactionsByPostId(id)
			})
		} else {
			const found = postReactions.find(
				r =>
					r.post_reactions.user_id === reactionToSave.user_id &&
					r.post_reactions.post_id === reactionToSave.post_id
			)
			deletePostReaction(found.post_reactions.id).then(() =>
				getReactionsByPostId(id)
			)
		}
	}

	useEffect(() => {
		getReactionsByPostId(id)
	}, [])

	return (
		<div className="reaction-border is-flex custom-flex-gap is-justify-content-space-between">
			{postReactions &&
				postReactions.map(r => {
					return (
						<p
							className="reaction is-clickable"
							key={r.id}
							onClick={() => handleSaveReaction(r)}>
							{r.image_url} {r.count}
						</p>
					)
				})}
		</div>
	)
}
