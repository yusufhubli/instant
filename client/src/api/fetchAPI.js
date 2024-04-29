
 const fetchAPI = async (url, method, body,token) => {
  try {
     // console.log(body)
      if (body == false) {
          const res = await fetch(`http://localhost:5000${url}`, {
              headers: {
                  "content-type": "application/json",
                  Authorization:token
              },
              method: method,
          })
          const data = await res.json()
          return data
      } else {
          const res = await fetch(`http://localhost:5000${url}`, {
              headers: {
                  "content-type": "application/json",
                  Authorization:token
              },
              method: method,
              body: JSON.stringify(body)
          })
          const data = await res.json()
          return data
      }

  } catch (error) {
      console.log(error)
  }
}

export const login = JSON.parse(localStorage.getItem("loggedUser")) || []

//const user = await fetchAPI("/orders", "GET",false)
//console.log(user)
export default fetchAPI

export const imageAPI = async(url,method,body)=>{
    try {
        const res = await fetch(`http://localhost:5000${url}`, {
            headers:{

            },
            method: method,
            body:body
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getDate = (date)=>{
    const day = new Date(date)
    return `${day.getDate()+'-'+(day.getMonth()+1)+'-'+day.getFullYear()}`
}