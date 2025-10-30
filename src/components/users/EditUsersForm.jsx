import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"

export const EditUsersForm = () => {
	const [checked, setChecked] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	const {
		users,
		getUsers,
		getUserById,
		user,
		updateUserInfo,
		getUserDemotionQueue,
		userDemotion,
		token,
		updateUserDemotion
	} = useContext(UserContext)

	useEffect(() => {
		getUserById(id)
		getUsers()
		getUserDemotionQueue(id)
	}, [])

	useEffect(() => {
		user.admin ? setChecked(true) : setChecked(false)
	}, [user])

	const handleSave = e => {
		e.preventDefault()

		const found = users.filter(u => u.admin)
		console.log(found)
		if (!checked && found.length <= 1) {
			window.alert(
				"make someone else an admin before the User Profile can be changed"
			)
		} else {
			if (!checked && !userDemotion.admin_id) {
				const data = {
					admin_id: token
				}
				updateUserDemotion(id, data).then(() => navigate(`/users`))
			} else if (!checked && !userDemotion.approver_one_id) {
				const data = {
					approver_one_id: token
				}
				updateUserDemotion(id, data).then(() => navigate(`/users`))
			} else {
				const data = {
					admin: checked
				}
				updateUserInfo(user.id, data).then(() => navigate(`/users`))
			}
		}
	}
	return (
		<div className="container">
			<h1 className="title">Edit {user.username}</h1>
			<form className="container">
				<fieldset>
					<label htmlFor="admin">Admin</label>
					<input
						className="ml-3"
						id="admin"
						onChange={() => setChecked(!checked)}
						type="checkbox"
						checked={checked}
					/>
				</fieldset>
				<div className="">
					<button className="button" onClick={handleSave}>
						Save
					</button>
					<button
						className="button ml-5"
						onClick={e => {
							e.preventDefault()
							navigate(`/users`)
						}}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
