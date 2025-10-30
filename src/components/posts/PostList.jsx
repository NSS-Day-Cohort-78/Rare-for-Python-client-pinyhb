import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { UserContext } from "../auth/UserProvider"

export const PostList = ({ post }) => {
	const navigate = useNavigate()
	const [checked, setChecked] = useState(false)
	const currentUser = useContext(UserContext).currentUser

	const { approvePost, getAllPosts } = useContext(PostContext)

	useEffect(() => {
		post.approved ? setChecked(true) : setChecked(false)
	}, [post])

	const navToEditPost = () => {
		navigate(`/edit-post/${post.id}`)
	}

	const handleSave = e => {
		const data = {
			approved: checked
		}
		approvePost(post.id, data).then(() => getAllPosts())
	}

	return (
		<tr>
			<td
				className="is-clickable"
				onClick={() => navigate(`/posts/${post.id}`)}>
				{post.title}
			</td>
			<td
				className="is-clickable"
				onClick={() => navigate(`/user-posts/${post.user.id}`)}>
				{post.user.first_name} {post.user.last_name}
			</td>
			<td>{post.category.label}</td>
			<td>
				<button onClick={navToEditPost}>Edit</button>
			</td>
			{currentUser?.admin ? (
				<td className="is-flex is-justify-content-space-around is-align-items-center">
					<input
						type="checkbox"
						checked={checked}
						id="approved"
						name="approved"
						onChange={() => setChecked(!checked)}
					/>
					<button onClick={handleSave} className="button">
						Save
					</button>
				</td>
			) : (
				""
			)}
		</tr>
	)
}
