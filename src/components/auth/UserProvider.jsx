import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))

	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})

	const getUsers = () => {
		fetch(`http://localhost:8088/users`)
			.then(res => res.json())
			.then(setUsers)
	}

	const getUserById = id => {
		fetch(`http://localhost:8088/users/${id}`)
			.then(res => res.json())
			.then(setUser)
	}

	return (
		<UserContext.Provider
			value={{
				token,
				setTokenState,
				users,
				getUsers,
				user,
				getUserById
			}}>
			{children}
		</UserContext.Provider>
	)
}
