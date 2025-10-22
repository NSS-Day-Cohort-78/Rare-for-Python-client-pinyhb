import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))

	return (
		<UserContext.Provider value={{ token, setTokenState }}>
			{children}
		</UserContext.Provider>
	)
}
