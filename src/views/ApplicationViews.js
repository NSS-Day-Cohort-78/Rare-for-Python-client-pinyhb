import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostProvider } from "../components/posts/PostProvider"
import { Posts } from "../components/posts/Posts"
import { CreatePost } from "../components/posts/CreatePost"

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
								<Outlet />
							</PostProvider>
						}>
						<Route index element={<Posts />} />
						<Route path="createpost" element={<CreatePost />} />
						{<Route path="postdetails" />}
					</Route>
				</Route>
			</Routes>
		</>
	)
}
