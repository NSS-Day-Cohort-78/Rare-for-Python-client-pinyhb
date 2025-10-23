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
								<CategoryProvider>
									<Outlet />
								</CategoryProvider>
							</PostProvider>
						}>
						<Route index element={<Posts />} />
						<Route path="createpost" element={<CreatePost />} />
						{<Route path="postdetails" />}
						<Route path="posts/:id" element={<PostDetails />} />
						<Route path="user-posts/:user" element={<Posts />} />
						<Route path="edit-post/:id" element={<EditPost />} />
						<Route path="users" element={<Users />} />
						<Route
							path="user-profile/:id"
							element={<UserDetails />}
						/>
            <Route path="categories" element={<Categories />} />
						<Route path="add-category" element={<AddCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}
