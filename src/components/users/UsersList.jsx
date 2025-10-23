import React from "react"
import { useNavigate } from "react-router-dom"

export const UsersList = ({ user }) => {
	const navigate = useNavigate()
	return (
		<tr>
			<td
				className="is-clickable"
				onClick={() => navigate(`/user-profile/${user.id}`)}>
				{user.first_name} {user.last_name}
			</td>
			<td>{user.username}</td>
			<td>add user type</td>
		</tr>
	)
}
