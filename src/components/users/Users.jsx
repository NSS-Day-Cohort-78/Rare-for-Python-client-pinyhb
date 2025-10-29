import React, { useContext, useEffect } from "react"
import { UserContext } from "../auth/UserProvider"
import { UsersList } from "./UsersList"
import "./user.css"

export const Users = ({ token }) => {
	const { users, getUsers, getCurrentUser, currentUser } =
		useContext(UserContext)

	useEffect(() => {
		getUsers()
		getCurrentUser(token)
	}, [])
	return (
		<div className="container">
			<h1>Users</h1>
			<table className="table is-bordered is-fullwidth">
				<tbody>
					{users?.map(u => (
						<UsersList
							key={u.id}
							user={u}
							currentUser={currentUser}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
