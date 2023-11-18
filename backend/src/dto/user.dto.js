const getLoginResponseDTO = (user) => ({
  username: user.username,
  email: user.email,
  full_name: user.full_name,
  role: user.role,
  token: user.token
})

const getUserDetailResponse = (user) => ({
  username: user.username,
  email: user.email,
  full_name: user.full_name,
  role: user.role
})

export {
  getLoginResponseDTO,
  getUserDetailResponse
}