import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"

export const EditUsersForm = () => {
	const [checked, setChecked] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	const { getUserById, user, updateUserInfo } = useContext(UserContext)

	useEffect(() => {
		getUserById(id)
	}, [])

	useEffect(() => {
		user.admin ? setChecked(true) : setChecked(false)
	}, [user])

	const handleSave = e => {
		e.preventDefault()
		const data = {
			admin: checked
		}
		updateUserInfo(user.id, data).then(() => navigate(`/users`))
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
