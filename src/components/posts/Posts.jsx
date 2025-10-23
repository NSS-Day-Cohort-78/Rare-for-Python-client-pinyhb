import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"
import { useNavigate } from "react-router-dom"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)
	const [filteredPosts, setFilteredPosts] = useState()
	const navigate = useNavigate()

	const navCreatePost = () => {
		navigate("/createpost")
	}

	useEffect(() => {
		getAllPosts()
	}, [])

	useEffect(() => {
		setFilteredPosts(posts)
	}, [posts])

	return (
		<>
			<div className="p-5">
				<SearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
			</div>
			<div className="buttons has-addons is-right">
				<button className="button is-link is-focused" onClick={navCreatePost}>Create Post</button>
			</div>
			<div className="p-5">
				<table className=" table is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{filteredPosts &&
							filteredPosts.map(
								post =>
									post.approved && (
										<PostList key={post.id} post={post} />
									)
							)}
					</tbody>
				</table>
			</div>
		</>
	)
}
