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
		updateUserDemotion,
		deleteDemotionQueue,
		addUserDemotion,
		setUserDemotion
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

		if (!checked && found.length <= 2) {
			window.alert(
				"make someone else an admin before the User Profile can be changed"
			)
		} else if (!userDemotion) {
			const data = {
				user_id: parseInt(id),
				admin_id: parseInt(token),
				approver_one_id: null
			}
			addUserDemotion(data).then(() => navigate(`/users`))
		} else if (
			userDemotion.admin_id === parseInt(token) ||
			userDemotion.approver_one_id === parseInt(token)
		) {
			window.alert("you already voted to change their status")
		} else if (userDemotion && !userDemotion.approver_one_id) {
			const data = {
				approver_one_id: parseInt(token)
			}
			const userData = {
				admin: checked
			}
			updateUserDemotion(id, data)
				.then(() => updateUserInfo(user.id, userData))
				.then(() => deleteDemotionQueue(userDemotion.id))
				.then(() => setUserDemotion(undefined))
				.then(() => navigate(`/users`))
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
