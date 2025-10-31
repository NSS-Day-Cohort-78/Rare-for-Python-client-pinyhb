import React, { useContext } from "react"
import { UserContext } from "../auth/UserProvider"

export const ReactivateUserButton = ({ user }) => {
	const { activateUser, getUsers } = useContext(UserContext)
	const handleClick = () => {
		const data = {
			active: true
		}
		activateUser(user.id, data).then(() => getUsers())
	}
	return (
		<button onClick={handleClick} className="button">
			Activate
		</button>
	)
}
