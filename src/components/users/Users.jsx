import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../auth/UserProvider"
import { UsersList } from "./UsersList"
import "./user.css"

export const Users = ({ token }) => {
	const { users, getUsers, getCurrentUser, currentUser } =
		useContext(UserContext)
	const [filteredUsers, setFilteredUsers] = useState([])

	useEffect(() => {
		getUsers()
		getCurrentUser(token)
	}, [])

	useEffect(() => {
		setFilteredUsers(users)
	}, [users])
	return (
		<div className="container">
			<h1>Users</h1>
			<table className="table is-bordered is-fullwidth">
				<tbody>
					{filteredUsers?.map(u => (
						<UsersList
							token={token}
							key={u.id}
							user={u}
							currentUser={currentUser}
							users={users}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
