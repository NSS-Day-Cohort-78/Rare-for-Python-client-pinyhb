import React from "react"
import { EditTagButton } from "./EditTagButton"

export const TagsList = ({ tag }) => {
	return (
		<div className="is-flex is-align-items-center is-flex-direction-column">
			<p>{tag.label}</p>
			<EditTagButton id={tag.id} />
		</div>
	)
}
