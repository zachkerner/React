import { useState } from 'react'
import '../App.css'
import { API } from '../mockApi/apiClient'
import { useEffect } from 'react'
import { HomesList } from './components/Homes.jsx'
import { LotsList } from './components/Lots.jsx'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams,
} from 'react-router-dom'

//for modals:
//link goes inside the map of HomesList and LotsList
//Route goes with the Routes
//modal is a clone of the original homes or lots page with the modal as a popover



const SideNav = () => {
  return (
    <div className="sidenav">
        <ul>
          <Link to={"./homes"}><li>Home Plans</li></Link>
          <Link to={"./lots"}><li>Lots</li></Link>
        </ul>
    </div>
  )
}

const HomePage = () => {
  return (
    <div>
    </div>  
  )
}



const LotsPopover = ({ lots }) => {
  const id = useParams().id
  const lot = lots.find(l => l.lotId === id)
  console.log('hi from lots')

  return (
    <h1>s</h1>
  )

}

function App() {
  const [homes, setHomes] = useState([])
  const [lots, setLots] = useState([])
  
  
  const getHomes = async () => {
    const homeList = await API.getHomePlans()
    setHomes(homeList)
  }

  const getLots = async () => {
    const lotList = await API.getLots()
    setLots(lotList)
  }

  useEffect(() => {
    try {
      getHomes()
      getLots()
    } catch(e) {
      console.log(e)
    }
  }, [])

 

  return (
    <Router>
      <SideNav />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/homes"} element={<HomesList homes={homes} />} />
        <Route path={"/lots"} element={ <LotsList lots={lots} />} />
      </Routes>
    </Router>
    
  )
}

export default App
