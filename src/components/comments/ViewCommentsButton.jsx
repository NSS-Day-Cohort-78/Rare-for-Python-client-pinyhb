import React from "react"
import { useNavigate } from "react-router-dom"

export const ViewCommentsButton = ({ id }) => {
	const navigate = useNavigate()
	return (
		<button
			className="button"
			onClick={() => navigate(`/posts/${id}/comments`)}>
			Comments
		</button>
	)
}
