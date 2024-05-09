import { RouterPath, LocalstorageKey } from '@/constant'
import LocalStorageManager from '@/utils/localStorageManager'
const passwordKey = new LocalStorageManager(LocalstorageKey.LOGIN_PASSWORD_KEY)
const userKey = new LocalStorageManager(LocalstorageKey.LOGIN_USERNAME_KEY)
export function remeberUser(username?: string, password?: string) {
  userKey.save(username)
  passwordKey.save(password)
}
export function deleteUser() {
  userKey.clear()
  passwordKey.clear()
}

export function getUser() {
  const username = userKey.load()
  const password = passwordKey.load()
  return { username, password }
}
