import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import { useNavigate } from "react-router-dom"

export const ConfirmDelete = ({ setModal, post }) => {
	const navigate = useNavigate()
	const { deletePost } = useContext(PostContext)
	const handleDelete = e => {
		deletePost(post.id).then(() => navigate("/"))
	}
	return (
		<div className="is-flex is-flex-direction-column is-align-items-center">
			<p>Are you sure you want to delete?</p>
			<div>
				<button className="is-clickable" onClick={handleDelete}>
					Confirm
				</button>
				<button
					className="is-clickable"
					onClick={() => setModal(false)}>
					Cancel
				</button>
			</div>
		</div>
	)
}
