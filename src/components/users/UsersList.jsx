import React from "react"

export const UsersList = ({ user }) => {
	return (
		<tr>
			<td>
				{user.first_name} {user.last_name}
			</td>
			<td>{user.username}</td>
			<td>add user type</td>
		</tr>
	)
}
