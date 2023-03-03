import { FC } from "react";
import { zoshigayaShuValues } from "../models/tombNumber";
import { useTombNumber } from "../states/selectedTombNumber";

export const NumberSelectorWidget: FC = () => {
  const { tombNumber, goValues, onChangeShu, onChangeGo, onChangeGawa } = useTombNumber()

  return (
    <div className="flex-row space-y-4 bg-white rounded-lg h-full p-4 drop-shadow-md">
      <div className="flex-row space-y-2">
        <div>墓地の名前を選択してください</div>
        <select className="w-48 h-12 p-2 bg-white rounded-md border-2">
          <option value="zoshigaya">雑司ヶ谷霊園</option>
        </select>
      </div>
      <div className="flex-row space-y-2">
        <div>墓地番号を入力してください</div>
        <div className="flex-row space-y-2">
          <div className="flex items-center space-x-2">
            <select
              className="w-48 h-12 p-2 bg-white rounded-md border-2"
              value={tombNumber.shu} 
              onChange={onChangeShu}
            >
              { zoshigayaShuValues.map((value) => <option key={value} value={value}>{value}</option>) }
            </select>
            <div>種</div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="w-48 h-12 p-2 bg-white rounded-md border-2"
              value={tombNumber.go}
              onChange={onChangeGo}
            >
              { goValues.map((value) => <option key={value} value={value}>{value}</option>) }
            </select>
            <div>号</div>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              className="w-48 h-12 p-2 bg-white rounded-md border-2"
              type="number"
              value={tombNumber.gawa}
              onChange={onChangeGawa}
            />
            <div>側</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
