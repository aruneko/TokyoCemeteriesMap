export const zoshigayaShuValues = [1, 2] as const

export type ZoshigayaShuValues = typeof zoshigayaShuValues[number]

export const zoshigaya1ShuGoValues = [
  '1', '2', '3', '4A', '4B', '5', '西6', '東6', '7', '8', '9', '10', '11', 
  '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'
] as const

export const zoshigaya2ShuGoValues = ['1', '3', '4', '7', '22'] as const

export type Zoshigaya1ShuGoValues = typeof zoshigaya1ShuGoValues[number]
export type Zoshigaya2ShuGoValues = typeof zoshigaya2ShuGoValues[number]

export type ZoshigayaGoLists = typeof zoshigaya1ShuGoValues | typeof zoshigaya2ShuGoValues

export type ZoshigayaGoValues = Zoshigaya1ShuGoValues | Zoshigaya2ShuGoValues
