import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactivateUserButton } from "./ReactivateUserButton"
import { UserContext } from "../auth/UserProvider"

export const UsersList = ({ user, currentUser, users }) => {
	const navigate = useNavigate()
	const [modal, setModal] = useState(false)
	const { activateUser, getUsers } = React.useContext(UserContext)

	const handleDeactivate = () => {
		const data = {
			active: false
		}
		activateUser(user.id, data).then(() => getUsers())
		setModal(false)
	}

	const confirmDeactivate = () => {
		const adminUsers = users.filter(u => u.admin && u.active)
		if (adminUsers.length > 2) {
			return (
				<div className="is-flex m-2">
					<p>Are you sure you want to deactivate this user account?</p>
					<div>
						<button className="is-clickable mx-1" 
						onClick={handleDeactivate}
						>
							Confirm
						</button>
						<button
							className="is-clickable mx-1"
							onClick={() => setModal(false)}>
							Cancel
						</button>
					</div>
				</div>
			)
		} else {
			return (
				<div className="is-flex m-2">
					<p>Please set new admin before deactivating.</p>
					<button
						className="is-clickable mx-1"
						onClick={() => setModal(false)}>
						Cancel
					</button>
				</div>
			)
		}
	}

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
				<td>
					<button
						onClick={() => navigate(`/users/${user.id}/edit`)}
						className="button mx-1">
						Edit
					</button>
					{user.active ? (
						<button
							onClick={() => setModal(true)}
							className="button mx-1">
							Deactivate
						</button>
					) : ("")}
					{currentUser.admin && !user.active ? (
						<ReactivateUserButton user={user} />
					) : (
						""
					)}

					{modal ? confirmDeactivate() : ""}
				</td>
			) : (
				""
			)}
		</tr>
	)
}
