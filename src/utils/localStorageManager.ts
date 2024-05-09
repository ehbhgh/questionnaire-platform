class LocalStorageManager<T> {
  private storageKey: string

  constructor(storageKey: string) {
    this.storageKey = storageKey
  }

  save(data: T): void {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(this.storageKey, jsonData)
  }

  load(): T | null {
    const jsonData = localStorage.getItem(this.storageKey)
    if (jsonData) {
      return JSON.parse(jsonData) as T
    }
    return null
  }

  clear(): void {
    localStorage.removeItem(this.storageKey)
  }
}
export default LocalStorageManager
