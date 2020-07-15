const isTokenExpired = () => {
    const currentTime = new Date()

    const expiredAt = new Date(localStorage.expiredAt)

    return(currentTime >= expiredAt)
}

export default isTokenExpired