import { useState } from "react"
import { css } from "@emotion/react"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"

export default function LabelBox({ trackerId }: { trackerId: string }) {
  const { controllers } = useDependencies()
  const { trackers, getTrackers } = useTrackers()
  const { setMessage } = useError()

  const tracker = trackers.find((tracker) => tracker.id === trackerId)
  const [label, setLabel] = useState(tracker.label)

  const handleChangeLabel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cacheLabel = label
    const newLabel = e.target.value
    setLabel(newLabel)
    const { isError } = await controllers.tracker.updateLabel(tracker, newLabel)
    if (isError) {
      setMessage()
      setLabel(cacheLabel)
      return
    }
    getTrackers()
  }

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <input
        css={css`
          flex-grow: 1;
          line-height: 20px;
          width: 100%;
          font-size: 13px;
          padding: 5px;
          border: 0;
          background: transparent;

          @media (prefers-color-scheme: dark) {
            color: #fff;
          }
        `}
        type="text"
        value={label}
        onChange={(e) => handleChangeLabel(e)}
        onBlur={(e) => handleChangeLabel(e)}
        placeholder="이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
      />
    </div>
  )
}
