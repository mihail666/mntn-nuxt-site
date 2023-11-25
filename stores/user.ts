export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isLoading: true,
      cart: [],
      checkout: [],
      userInfo: [
        {'name': 'mihail', 'email': 'fam@gmail.com', 'phone': '+79958360911', 'select': 'item 1', }
      ],
      address: []
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
