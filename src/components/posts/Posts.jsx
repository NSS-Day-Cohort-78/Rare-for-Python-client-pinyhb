import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router-dom"
import { FilterCategory } from "./FilterCategory"
import { TagsSearchBar } from "./TagsSearchBar"
import { UserContext } from "../auth/UserProvider"
import { Users } from "../users/Users"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)
	const { id } = useParams()
	const [filteredPosts, setFilteredPosts] = useState()
	const [author, setAuthor] = useState(undefined)
	const { getCurrentUser, currentUser, token, getUserById, user } =
		useContext(UserContext)
	const navigate = useNavigate()
	const location = useLocation()

	const navCreatePost = () => {
		navigate("/create-post")
	}

	useEffect(() => {
		getAllPosts()
		getCurrentUser(token)
	}, [location.pathname])	
		

	useEffect(() => {
		getUserById(id)
	}, [id])

	useEffect(() => {
		if (id) {
			const userPosts = posts.filter(p => p.user.id === parseInt(id))
			setFilteredPosts(userPosts)

			setAuthor(user)
		} else {
			setFilteredPosts(posts)
			setAuthor(undefined)
		}
	}, [posts, id, user])

	return (
		<>
			<div className="container is-flex is-flex-direction-row is-justify-content-space-evenly p-5">
				<div className="is-grouped is-flex is-flex-direction-row">
					<p>Search by title:</p>
					<SearchBar
						setFilteredPosts={setFilteredPosts}
						posts={posts}
					/>
				</div>
				<div className="is-grouped is-flex is-flex-direction-row">
					<p>Search by tag:</p>
					<TagsSearchBar
						setFilteredPosts={setFilteredPosts}
						posts={posts}
					/>
				</div>
				<FilterCategory
					setFilteredPosts={setFilteredPosts}
					posts={posts}
				/>
			</div>
			<div className="buttons has-addons is-right">
				<button
					className="button is-link is-focused"
					onClick={navCreatePost}>
					Create Post
				</button>
			</div>
			<div className="p-5 container">
				<table className=" table is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Category</th>
							<th>Edit</th>
							{currentUser && currentUser.admin ? (
								<th>Approved</th>
							) : (
								""
							)}
						</tr>
					</thead>
					<tbody>
						{currentUser && currentUser.admin
							? filteredPosts &&
							  filteredPosts.map(post => (
									<PostList
										key={post.id}
										post={post}
										currentUser={currentUser}
									/>
							  ))
							: filteredPosts &&
							  filteredPosts.map(post =>
									post.approved ? (
										<PostList key={post.id} post={post} />
									) : (
										""
									)
							  )}
					</tbody>
				</table>
				{id && author ? (
					<button
						onClick={() => navigate(`/user-profile/${author.id}`)}
						className="button">
						{author.username}
					</button>
				) : (
					""
				)}
			</div>
		</>
	)
}
