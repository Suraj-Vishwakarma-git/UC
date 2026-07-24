import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import Notification from './Notification';

function App() {
  const [data,setData]=useState([]);
  const [name,setName]=useState("");
  const [selectedEpi,setselectedEpi]=useState(null);
  const [notification,setNotification]=useState(null);


  const getData=async ()=>{
    try{
      const API=await axios.get("https://api.tvmaze.com/shows/431/episodes");
      setData(API.data);
      console.log(API.data);
    }catch(e){
      console.log(e);
    }
  }

  const fetchEpisode=()=>{
    try{
        if(!name){
          setNotification({msg:"Enter Name First" ,type:"error"})
          return;
        }
        const dataa=data.find((e)=>
           e.name.toLowerCase()===name.toLowerCase()
        );
        if(!dataa){
          setNotification({msg:"Episode Not available" ,type:"error"})
          return;
        }
        setselectedEpi(dataa);
    }catch(e){
      console.log(e);
    }
  }
 
  useEffect(()=>{
    getData();
  },[]);


  return (
   <>
   {notification && (
              <Notification
                message={notification.msg}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
      )}
    <div className="searchBox"> 
    <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter Episode Name' className='Input' />
    <button className='btn' onClick={fetchEpisode}> Search</button>
    </div>
    <div className="data">
      {
        selectedEpi && <div className='Main'>
          {
            <div className='EpisodeCard'>
            <img src={selectedEpi?.image?.medium} className='img'/>
            <h1>{selectedEpi?.name}</h1>
            <div className="cmm">
            <h3>Rating : {selectedEpi?.rating?.average}</h3>
            <h3>Episode No : {selectedEpi?.season}</h3>
            </div>
            <h3>{selectedEpi?.summary?.replace(/<[^>]*>/g,"")}</h3>
            </div>
          }
        </div>
      }
    </div>
    
   </>
  )
}

export default App
