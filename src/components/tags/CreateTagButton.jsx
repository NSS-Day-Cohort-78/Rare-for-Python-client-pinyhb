import React from "react"
import { useNavigate } from "react-router-dom"

export const CreateTagButton = () => {
	const navigate = useNavigate()
	return (
		<button
			onClick={() => navigate("/tags-manager/create")}
			className="button ml-5">
			Create Tag
		</button>
	)
}
