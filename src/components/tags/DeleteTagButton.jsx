import React, { useContext, useState } from "react"
import { TagsContext } from "./TagsProvider"

export const DeleteTagButton = ({ id, modal, setModal }) => {
	const { deleteTag, getAllTags } = useContext(TagsContext)
	return (
		<div>
			<div className="is-flex">
				<button
					className="button"
					onClick={() => deleteTag(id).then(() => getAllTags())}>
					Confirm
				</button>
				<button className="ml-5 button" onClick={() => setModal(false)}>
					Cancel
				</button>
			</div>
		</div>
	)
}
