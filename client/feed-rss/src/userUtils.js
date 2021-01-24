export const isAuth = () => {
    const isLogged = localStorage.getItem("user")
    const user = JSON.parse(isLogged)

    if (user && user.accessToken) {
        return true
    } else {
        return false
    }
}

export const logOut = () => {
    localStorage.setItem("user", null)
}

export const getUserData = () => {
    const isLogged = localStorage.getItem("user")
    return JSON.parse(isLogged)
}