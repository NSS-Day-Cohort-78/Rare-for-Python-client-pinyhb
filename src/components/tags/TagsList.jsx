import React, { useState } from "react"
import { EditTagButton } from "./EditTagButton"
import { DeleteTagButton } from "./DeleteTagButton"
import { DeleteTagShowModal } from "./DeleteTagShowModal"
import { CreateTagButton } from "./CreateTagButton"

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
						<DeleteTagShowModal setModal={setModal} />
						<CreateTagButton />
					</>
				)}
			</div>
		</div>
	)
}
