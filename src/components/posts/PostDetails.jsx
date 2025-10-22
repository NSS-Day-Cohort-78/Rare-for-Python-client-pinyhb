import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"
import { ConfirmDelete } from "./ConfirmDelete"
import "./post.css"

export const PostDetails = () => {
	const { getPostById, post } = useContext(PostContext)
	const { id } = useParams()
	const { token } = useContext(UserContext)
	const [modal, setModal] = useState(false)

	useEffect(() => {
		getPostById(id)
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
				</div>
			</div>

			{parseInt(token) === post.user?.id ? (
				<div className="is-flex is-align-items-center is-justify-content-center">
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
