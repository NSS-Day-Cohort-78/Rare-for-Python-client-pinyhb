import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))

	const [users, setUsers] = useState([])

	const getUsers = () => {
		fetch(`http://localhost:8088/users`)
			.then(res => res.json())
			.then(setUsers)
	}

	return (
		<UserContext.Provider value={{ token, setTokenState, users, getUsers }}>
			{children}
		</UserContext.Provider>
	)
}
