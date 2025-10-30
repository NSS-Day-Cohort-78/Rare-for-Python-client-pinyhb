import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"
import { ConfirmDelete } from "./ConfirmDelete"
import "./post.css"
import { ViewCommentsButton } from "../comments/ViewCommentsButton"
import { AddCommentsButton } from "../comments/AddCommentsButton"
import { ViewPostReactions } from "../reactions/ViewPostReactions"

export const PostDetails = () => {
	const { getPostById, post } = useContext(PostContext)
	const { id } = useParams()
	const { token, currentUser, getCurrentUser } = useContext(UserContext)
	const navigate = useNavigate()
	const [modal, setModal] = useState(false)

	useEffect(() => {
		getPostById(id)
		getCurrentUser(token)
	}, [])

	return (
		<>
			<div className="post-container p-5">
				<div className="card">
					<header className="card-header">
						<h1 className="card-header-title">{post.title}</h1>
						<p className="card-header-icon">
							{post.publication_date}
						</p>
					</header>
					<div className="card-content">
						<div className="content">
							<div className="card-image">
								<img
									className="image"
									src={post.image_url}
									alt={post.title}
								/>
							</div>
							<p>{post.content}</p>
						</div>
					</div>
					<div className="card-footer">
						<p className="card-footer-item">
							{post.user?.username}
						</p>
					</div>
					<div className="is-flex-wrap-wrap is-justify-content-space-between">
						<div className="is-flex is-justify-content-space-between custom-flex-gap">
							<AddCommentsButton id={post.id} />
							<ViewCommentsButton id={post.id} />
						</div>
						<ViewPostReactions />
					</div>
				</div>
			</div>

			{currentUser.admin || parseInt(token) === post.user?.id ? (
				<div className="is-flex is-align-items-center is-justify-content-center">
					<button
						className="button"
						onClick={() => navigate(`/posts/${id}/tags`)}>
						Manage Tags
					</button>
					<i
						onClick={() => setModal(true)}
						className="fa-solid fa-trash is-clickable"></i>
				</div>
			) : (
				""
			)}

			{modal ? <ConfirmDelete setModal={setModal} post={post} /> : ""}
		</>
	)
}
