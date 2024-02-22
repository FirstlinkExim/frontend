export const storeInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const lookInInLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage= (key: string) => {
  return localStorage.removeItem(key);
};

export const logoutUser = () => {
  localStorage.clear();
};
