import React from "react"

export const ReactionsList = ({ reaction }) => {
	return (
		<div className="mt-5 is-flex is-align-items-center is-justify-content-start">
			<p className="m-1">{reaction.label}</p>
			<p className="m-1">{reaction.image_url}</p>
		</div>
	)
}
