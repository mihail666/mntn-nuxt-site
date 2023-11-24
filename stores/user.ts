export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isLoading: false,
      cart: [],
      checkout: [],
      userInfo: [],
      userAddress: []
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
