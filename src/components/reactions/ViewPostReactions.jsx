import React, { useContext, useEffect } from "react"
import { ReactionsContext } from "./ReactionsProvider"
import "./reactions.css"
import { useParams } from "react-router-dom"

export const ViewPostReactions = () => {
	const { postReactions, getReactionsByPostId } = useContext(ReactionsContext)

	const { id } = useParams()
	useEffect(() => {
		getReactionsByPostId(id)
	}, [])
	return (
		<div className="reaction-border is-flex custom-flex-gap is-justify-content-space-between">
			{postReactions &&
				postReactions.map(r => {
					return (
						<p className="reaction is-clickable" key={r.id}>
							{r.image_url} {r.count}
						</p>
					)
				})}
		</div>
	)
}
