import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactivateUserButton } from "./ReactivateUserButton"

export const UsersList = ({ user, currentUser }) => {
	const navigate = useNavigate()

	return (
		<tr>
			<td
				className="is-clickable"
				onClick={() => navigate(`/user-profile/${user.id}`)}>
				{user.first_name} {user.last_name}
			</td>
			<td>{user.username}</td>
			<td>{user.admin ? "Admin" : "Author"}</td>
			{currentUser.admin ? (
				<>
					<td className="is-flex is-justify-content-center">
						<button
							onClick={() => navigate(`/users/${user.id}/edit`)}
							className="button">
							Edit
						</button>
					</td>
					<td>
						<ReactivateUserButton user={user} />
					</td>
				</>
			) : (
				""
			)}
		</tr>
	)
}
