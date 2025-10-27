import React from "react"

export const DeleteTagShowModal = ({ setModal }) => {
	return (
		<button className=" ml-5 button" onClick={() => setModal(true)}>
			Delete
		</button>
	)
}
