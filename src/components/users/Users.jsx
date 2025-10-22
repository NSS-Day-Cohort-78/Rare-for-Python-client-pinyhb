import React, { useContext, useEffect } from "react"
import { UserContext } from "../auth/UserProvider"

export const Users = () => {
	const { users, getUsers } = useContext(UserContext)

	useEffect(() => {
		getUsers()
	}, [])
	return (
		<div>
			<h1>Users</h1>
			<table className="table">
				<tbody>{users?.map(u => "")}</tbody>
			</table>
		</div>
	)
}
