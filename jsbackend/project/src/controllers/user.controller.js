const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)



    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}