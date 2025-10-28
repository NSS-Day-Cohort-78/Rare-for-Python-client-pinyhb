import React from "react"
import { useNavigate } from "react-router-dom"

export const EditTagButton = ({ id }) => {
	const navigate = useNavigate()
	return (
		<button className="button" onClick={() => navigate(`${id}/edit`)}>
			Edit
		</button>
	)
}
