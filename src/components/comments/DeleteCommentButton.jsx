import { useContext, useEffect } from "react"
import { CommentsContext } from "./CommentsProvider"
import { useNavigate, useParams } from "react-router-dom"

export const DeleteCommentButton = ({ comment, setModal }) => {
	const { deleteComment } = useContext(CommentsContext)
	const { getAllComments } = useContext(CommentsContext)
	// const navigate = useNavigate()
	const { id } = useParams()

	const handleDelete = () => deleteComment(comment.id)

	useEffect(() => {
		getAllComments(id)
	}, [id])

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
