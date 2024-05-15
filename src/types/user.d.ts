export interface UserInterface {
  userName: string
  nickname: string
  url: string
}

export interface UserReducerInterface {
  user: {
    userName: string
    nickname: string
    url: string
  }
}

export interface UserReducerItemInterface {
  user: {
    user: {
      userName: string
      nickname: string
      url: string
    }
  }
}
