import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useParams } from "react-router-dom"

export const PostDetails = () => {
	const { getPostById, post } = useContext(PostContext)
	const { id } = useParams()

	useEffect(() => {
		getPostById(id)
	}, [post])

	return (
		<div className="p-5">
			<div className="card">
				<header className="card-header">
					<h1 className="card-header-title">{post.title}</h1>
					<p className="card-header-icon">{post.publication_date}</p>
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
					<p className="card-footer-item">{post.user?.username}</p>
				</div>
			</div>
		</div>
	)
}
