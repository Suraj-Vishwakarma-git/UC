import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from "axios";
import './App.css'

function App() {

  const [box,setBox]=useState(false);
  const [data,setData]=useState([]);
  const [episodeNo,setepisodeNo]=useState("");
  const [searchedData,setsearchedData]=useState({});
  const setDa=async ()=>{
   try{
    const API=await axios.get("https://api.tvmaze.com/shows/431/episodes");
    const data=await API.data;
    if(!data){
      alert("Server Error");
      return;
    }
    console.log(data);
    setData(data);
  }catch(e){
    alert(e);
  }
}
  const FindEpi=()=>{
    const episodeData=data.find((e)=>episodeNo.toLowerCase()==e.name.toLowerCase());
    if(!episodeData){
      alert("Episode Not Exist");
      return ;
    }
    setBox(true);
    setsearchedData(episodeData);
    console.log(episodeData);
  }
    
  useEffect(()=>{
      setDa();
  },[])

  return (<>
    <input type="text" placeholder='Search' onChange={(e)=>setepisodeNo(e.target.value)}/>
    <button onClick={FindEpi}>Submit</button>
    { box && <>
       <h2>{searchedData.name}</h2>
       <p>Season {searchedData.season} • Episode {searchedData.number}</p>
       <p>⭐ {searchedData.rating.average}</p>
       <p>{searchedData.airdate}</p>
       <p>{searchedData.runtime} mins</p>
       <img src={searchedData.image.medium} alt={searchedData.name} />

<div
  dangerouslySetInnerHTML={{ __html: searchedData.summary }}
/>
        </>
    }
  </>)

}

export default App
