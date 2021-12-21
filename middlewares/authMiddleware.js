const authMiddleware = async ({ request, response, state }, next) => {

    const startsWith = (path) => {
        const paths = ["/questions", "/quiz", "/statistics"]
    
        let i = 0
        while (i < 3) {
            if (path.startsWith(paths[i])) return true
            i++
        }
        return false
    }

    const path = request.url.pathname

    if (startsWith(path) && !(await state.session.get('authenticated'))) {
        response.redirect('/auth/login')
    } else {
        await next()
    }
}

export default authMiddleware