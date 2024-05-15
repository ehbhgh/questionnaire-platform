const isLoginOrRegister = (pathname: string, pathList: string[]) => {
  if (pathList.includes(pathname)) {
    return true
  }
  return false
}

export { isLoginOrRegister }
