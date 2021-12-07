//ehkä paskaa

const authorizeAccess = async ({state}) => {
    const auth = await state.session.get("authenticated")

    if (!auth) return response.redirect("/auth/login")
}

export { authorizeAccess }