import {useState} from "react";

const ddd = () => {
    const [select, setSelect] = useState<string[]>(['44444'])

    const [ddd, setDDD] = useState<boolean>(false)
    return <>
        <div style={{width: '200px', height: '200px', border: '1px solid black'}} onClick={() => {
            const key = '222'
            const tmp = select.slice()
            const index = select.indexOf(key)
            if (index > -1) {
                tmp.splice(index, 1)
            } else {
                tmp.push(key)
            }
            setSelect(tmp)
            console.log(tmp)
        }}>
            {select.length}
        </div>


        <div style={{width: '200px', height: '200px', border: '1px solid black'}} onClick={() => {
            setDDD(!ddd)
        }}>
            {ddd ? '222' : '2435'}
        </div>
    </>
}


export default ddd