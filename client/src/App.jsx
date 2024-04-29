
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar.jsx"
import Button from "./templates/Button.jsx"
import { useSelector} from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Test from './templates/Test.jsx'
import ViewProfile from './pages/ViewProfile.jsx'
import MobileNav from './components/MobileNav.jsx'

function App() {
  // const dispatch = useDispatch()
   const mode = useSelector(state=>state.item.mode)
  // const handleRemove = (id)=>{
  //   dispatch(removeItem(id))
  // }
  // console.log(item)
  // useEffect(()=>{
  //  dispatch(fetchItem())
  // },[])
  return (
    <div className={`${mode == "light"?" bg-b-dark text-white w-full h-screen":" bg-b-light relative text-black w-full h-screen overflow-hidden lg:overflow-y-scroll"} m-0 p-0 `}>
        <BrowserRouter> 
        <Navbar />
        <Routes className='h-[100vh] snap-y snap-mandatory'> 
          <Route path='/' Component={Home}/>
          <Route path='/signin' Component={Login}/>
          <Route path='/signup' Component={Register}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/profile/:id' Component={ViewProfile}/>
         <Route path='/test' Component={Test}/>
         </Routes>
         <MobileNav/>
         <Footer/>
        </BrowserRouter> 
    </div>
    // <div style={{display:"flex",flexWrap:"wrap"}}>
    //   {
    //     item.map((x,index)=>{
    //       return <div style={{border:"1px solid black",margin:"10px",padding:"15px",width:'100px'}} key={index}>
    //         <h3>{x.itemName}</h3>
    //         <h3>{x.itemQty}</h3>
    //         <h3>{x.price}</h3>
    //         <button onClick={()=>handleRemove(x._id)}>REMOVE</button>
    //         <button onClick={()=>dispatch(addCart(x))}>ADD</button>
    //       </div>
    //     })
    //   }
    // </div>

  )
}

export default App
