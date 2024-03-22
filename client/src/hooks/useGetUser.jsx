export const useGetUser = () => {
  return window.sessionStorage.getItem('userID')
}
