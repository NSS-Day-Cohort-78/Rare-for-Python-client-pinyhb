import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"

export const PostDetails = () => {
	const { getPostById, post } = useContext(PostContext)
	const { id } = useParams()
	const { token } = useContext(UserContext)

	useEffect(() => {
		getPostById(id)
	}, [post])

	return (
		<>
			<div className="p-5 is-flex is-align-items-center">
				<div className="card is-flex-grow-1 ">
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
			{parseInt(token) === post.user.id ? (
				<div className="is-flex is-align-items-center is-justify-content-center">
					<i className="fa-solid fa-trash is-clickable"></i>
				</div>
			) : (
				""
			)}
		</>
	)
}
