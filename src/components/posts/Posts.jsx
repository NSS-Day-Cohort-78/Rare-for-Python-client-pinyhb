import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"
import { UserContext } from "../auth/UserProvider"
import { useParams } from "react-router-dom"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)
	const { token } = useContext(UserContext)

	const [filteredPosts, setFilteredPosts] = useState()
	const { user } = useParams()

	useEffect(() => {
		getAllPosts()
	}, [])

	useEffect(() => {
		if (user) {
			const userPosts = posts.filter(p => p.user.id === parseInt(user))
			setFilteredPosts(userPosts)
		} else {
			setFilteredPosts(posts)
		}
	}, [posts, user])

	return (
		<>
			<div className="p-5">
				<SearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
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
