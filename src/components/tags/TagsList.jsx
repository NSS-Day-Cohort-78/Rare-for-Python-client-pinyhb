import React, { useState } from "react"
import { EditTagButton } from "./EditTagButton"
import { DeleteTagButton } from "./DeleteTagButton"

export const TagsList = ({ tag }) => {
	const [modal, setModal] = useState(false)
	return (
		<div className="is-flex is-align-items-center is-flex-direction-column">
			<p>{tag.label}</p>
			<div className="is-flex">
				{modal ? (
					<DeleteTagButton id={tag.id} setModal={setModal} />
				) : (
					<>
						<EditTagButton id={tag.id} />
						<button
							className=" ml-5 button"
							onClick={() => setModal(true)}>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	)
}
