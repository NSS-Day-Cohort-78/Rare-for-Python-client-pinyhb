import React, { useContext, useState } from "react"
import { TagsContext } from "./TagsProvider"

export const DeleteTagButton = ({ id }) => {
	const [modal, setModal] = useState(false)
	const { deleteTag } = useContext(TagsContext)
	return (
		<div>
			{modal ? (
				<div>
					<button className="button" onClick={() => deleteTag(id)}>
						Confirm
					</button>
					<button className="button" onClick={() => setModal(false)}>
						Cancel
					</button>
				</div>
			) : (
				<button className="button" onClick={() => setModal(true)}>
					Delete
				</button>
			)}
		</div>
	)
}
