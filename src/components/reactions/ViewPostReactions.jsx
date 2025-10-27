import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ReactionsContext } from "./ReactionsProvider"
import "./reactions.css"

export const ViewPostReactions = () => {
	const { postReactions, getReactionsByPostId } = useContext(ReactionsContext)
	const { addPostReaction } = useContext(ReactionsContext)
	const { id } = useParams()

	const handleSaveReaction = (selectedReaction) => {
				const userId = localStorage.getItem("auth_token")
				const reactionToSave = {
					user_id: parseInt(userId),
					reaction_id: selectedReaction.id,
					post_id: parseInt(id)
				}
	
				if (!postReactions || !Array.isArray(postReactions)) {
					console.log("No reactions data available")
					return
				}
	
				const alreadyReacted = postReactions.some(postReactions => postReactions.user_id === reactionToSave.user_id && 
				postReactions.post_id === reactionToSave.post_id)
				
				if (!alreadyReacted) {
					addPostReaction(reactionToSave)
					.then(() => {
						getReactionsByPostId(id)
					})
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
						<p className="reaction is-clickable" key={r.id} onClick={() => handleSaveReaction(r)}>
							{r.image_url} {r.count}
						</p>
					)
				})}
		</div>
	)
}
