import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

const menuDisplayedState = atom({
  key: 'menuDisplayed',
  default: true,
})

export function useMenuDisplayed() {
  const [menuDisplayed, setMenuDisplayed] = useRecoilState(menuDisplayedState)

  const toggleMenuDisplayed = useCallback((currentState: boolean) => {
    setMenuDisplayed(!currentState)
  }, [setMenuDisplayed])

  return { menuDisplayed, toggleMenuDisplayed }
}
