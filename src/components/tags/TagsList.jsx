import React from "react"
import { EditTagButton } from "./EditTagButton"

export const TagsList = ({ tag }) => {
	return (
		<div>
			<p>{tag.label}</p>
			<EditTagButton id={tag.id} />
		</div>
	)
}
