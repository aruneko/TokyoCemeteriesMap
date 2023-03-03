import { ChangeEvent, useCallback, useState } from "react"
import { atom, useRecoilState } from "recoil"
import { zoshigaya1ShuGoValues, zoshigaya2ShuGoValues, ZoshigayaGoLists, ZoshigayaGoValues, zoshigayaShuValues, ZoshigayaShuValues } from "../models/tombNumber"

type TombNumber = {
  shu: ZoshigayaShuValues
  go: ZoshigayaGoValues
  gawa: number
}

export const selectedTombNumber = atom<TombNumber>({
  key: 'tombNumber',
  default: { shu: 1, go: '1', gawa: 1 },
})

export function useTombNumber() {
  const [tombNumber, setTombNumber] = useRecoilState(selectedTombNumber)
  const [goValues, setGoValues] = useState<ZoshigayaGoLists>(zoshigaya1ShuGoValues)

  const onChangeShu = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const parsed = parseInt(selectedValue) as ZoshigayaShuValues
    if (zoshigayaShuValues.includes(parsed)) {
      const refreshed: TombNumber = { ...tombNumber, shu: parsed, go: '1' }
      setTombNumber(refreshed)
      if (parsed === 1) {
        setGoValues(zoshigaya1ShuGoValues)
      } else if (parsed === 2) {
        setGoValues(zoshigaya2ShuGoValues)
      }
    }
  }, [setTombNumber, tombNumber])

  const onChangeGo = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as ZoshigayaGoValues
    const refreshed = { ...tombNumber, go: selectedValue }
    setTombNumber(refreshed)
  }, [setTombNumber, tombNumber])

  const onChangeGawa = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value
    try {
      const parsed = parseInt(selectedValue)
      const refreshed = { ...tombNumber, gawa: parsed }
      setTombNumber(refreshed)
    } catch(e) {
      console.log("parse error")
    }
  }, [setTombNumber, tombNumber])

  return { tombNumber, goValues, onChangeShu, onChangeGo, onChangeGawa }
}
