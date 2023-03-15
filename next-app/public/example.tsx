import React, { useState } from 'react'

type caseType = 'normal' | 'move' | 'raise' | 'down'

const ReactComponent: React.FC = () => {
  const [caseSource, setCaseSource] = useState<{ cover: string; type: caseType }[]>([])
  const [control, setControl] = useState<boolean>(false)

  return (
    <>
      {caseSource.map((item, key) => {
        switch (item.type) {
          case 'normal':
            return (
              <div
                key={key}
                className={'f-ull'} // 用 Tailwind 应用的样式
                style={{
                  ...{ border: control ? '1px dashed black' : '1px solid black' }, // 用 boolean 判断需要的样式
                  ...(() => {
                    switch (item.type) {
                      case 'normal':
                        return { borderColor: 'red' }
                    }
                  })(), // 用 type 多状态判断的样式
                }}
              ></div>
            )
          case 'move':
            return <div key={key}></div>
          case 'raise':
            return <div key={key}></div>
          case 'down':
            return <div key={key}></div>
        }
      })}
    </>
  )
}

export default ReactComponent
