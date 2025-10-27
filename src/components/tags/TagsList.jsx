import React from "react"
import { EditTagButton } from "./EditTagButton"
import { DeleteTagButton } from "./DeleteTagButton"

export const TagsList = ({ tag }) => {
	return (
		<div className="is-flex is-align-items-center is-flex-direction-column">
			<p>{tag.label}</p>
			<EditTagButton id={tag.id} />
			<DeleteTagButton id={tag.id} />
		</div>
	)
}
