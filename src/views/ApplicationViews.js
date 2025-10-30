import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostProvider } from "../components/posts/PostProvider"
import { Posts } from "../components/posts/Posts"
import { CreatePost } from "../components/posts/CreatePost"
import { PostDetails } from "../components/posts/PostDetails"
import { Categories } from "../components/categories/Categories"
import { CategoryProvider } from "../components/categories/CategoryProvider"
import { EditPost } from "../components/posts/EditPost"
import { Users } from "../components/users/Users"
import { UserDetails } from "../components/users/UserDetails"
import { AddCategory } from "../components/categories/AddCategory"
import { EditCategory } from "../components/categories/EditCategory"
import { Comments } from "../components/comments/Comments"
import { CommentsProvider } from "../components/comments/CommentsProvider"
import { AddCommentForm } from "../components/comments/AddCommentForm"
import { EditCommentForm } from "../components/comments/EditCommentForm"
import { ReactionsProvider } from "../components/reactions/ReactionsProvider"
import { ReactionManager } from "../components/reactions/ReactionManager"
import { TagManager } from "../components/tags/TagManager"
import { TagsProvider } from "../components/tags/TagsProvider"
import { EditTagForm } from "../components/tags/EditTagForm"
import { CreateTagForm } from "../components/tags/CreateTagForm"
import { PostTags } from "../components/tags/PostTags"
import { SubscribedPosts } from "../components/posts/SubscribedPosts"
import { SubscriptionProvider } from "../components/subscriptions/SubscriptionProvider"
import { EditUsersForm } from "../components/users/EditUsersForm"

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route
					path="/register"
					element={<Register setToken={setToken} />}
				/>
				<Route element={<Authorized token={token} />}>
					{/* Add Routes here */}
					<Route
						path="/"
						element={
							<PostProvider>
								<TagsProvider>
									<SubscriptionProvider>
										<ReactionsProvider>
											<CommentsProvider>
												<CategoryProvider>
													<Outlet />
												</CategoryProvider>
											</CommentsProvider>
										</ReactionsProvider>
									</SubscriptionProvider>
								</TagsProvider>
							</PostProvider>
						}>
						<Route
							index
							element={<SubscribedPosts token={token} />}
						/>
						<Route path="posts" element={<Posts />} />
						<Route path="create-post" element={<CreatePost />} />
						{<Route path="postdetails" />}
						<Route path="posts/:id" element={<Outlet />}>
							<Route index element={<PostDetails />} />
							<Route
								path="comments"
								element={<Comments token={token} />}
							/>
							<Route
								path="comment/add"
								element={<AddCommentForm />}
							/>
							<Route
								path="comment/:commentId/edit"
								element={<EditCommentForm />}
							/>
							<Route path="tags" element={<PostTags />} />
						</Route>
						<Route path="user-posts/:id" element={<Posts />} />
						<Route path="edit-post/:id" element={<EditPost />} />
						<Route path="users" element={<Outlet />}>
							<Route index element={<Users token={token} />} />
							<Route
								path=":id/edit"
								element={<EditUsersForm />}
							/>
						</Route>
						<Route
							path="user-profile/:id"
							element={<UserDetails token={token} />}
						/>
						<Route path="categories" element={<Categories />} />
						<Route path="add-category" element={<AddCategory />} />
						<Route
							path="edit-category/:id"
							element={<EditCategory />}
						/>
						<Route
							path="reaction-manager"
							element={<ReactionManager />}
						/>
						<Route path="tags-manager" element={<Outlet />}>
							<Route index element={<TagManager />} />
							<Route path=":id/edit" element={<EditTagForm />} />
							<Route path="create" element={<CreateTagForm />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	)
}
