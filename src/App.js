
import './App.css';
import {useEffect, useState} from "react"
import Searchbar from './components/Searchbar';
import countries from "./utils/countries"
import "./style.css"

function App() {
  const [query, setquery] = useState('')
  const [loading, setloading] = useState(false)
  const [suggestions, setsuggestions] = useState([])

  useEffect(()=>{
    if(query===""){
      setsuggestions([])
    }else{
      let newListofsuggestions=countries.filter((item)=>item.country.toLowerCase().indexOf(query) !== -1 ? true : false).map((item)=>item.country)
      setsuggestions(newListofsuggestions)
    }
    setTimeout(()=>setloading(false),1000)
  },[query])
  return (
    <div className="App">
     <h1>search bar</h1>
     <div>query is: {query}</div>
     <Searchbar loading={loading} setloading={setloading} suggestions={suggestions} onChange={(val)=>setquery(val)}/>
    </div>
  );
}

export default App;
