import React from "react"
import { useNavigate } from "react-router-dom"

export const AddCommentsButton = ({ id }) => {
	const navigate = useNavigate()
	return (
		<button
			onClick={() => navigate(`/posts/${id}/comment/add`)}
			className="button">
			Add Comment
		</button>
	)
}
