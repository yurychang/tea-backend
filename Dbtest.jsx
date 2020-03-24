import React, { useState, useEffect } from 'react'

function Dbtest() {

  const [total, setTotal] = useState([])

  async function getDataFromServer() {
    const request = new Request('http://localhost:3333/try-db', {
      method: 'GET',
      //mode:'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),

    })

    const response = await fetch(request)
    const data = await response.json()
    //setTotal(data)
    return data;
  }

  useEffect(() => {
    let i =0;
    setTimeout(async () => {
      setTotal(await getDataFromServer())
    }, 500)
  }, [])

  console.log('total', total);

  const datalist = (
    <>
      {total.map((value,index)=>{
        return (
          <div>
            {value.vendorAccount}
          </div>
        )
      })}

    </>
  )


  return (
    <>
      <div>{datalist}</div>
    </>
  )


}


export default Dbtest