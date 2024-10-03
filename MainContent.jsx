import Container from '@mui/material/Container';
import "./src/App.css"
import Timing from './Timing';
import axios from 'axios';
import { useEffect, useState  } from 'react';
import moment from 'moment-timezone';
import { Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';


export default function MainContent() {
  const theme = useTheme() ;


  const [data , setdata ] = useState({
    Fajr: '',
    Sunrise: '',
    Dhuhr: '',
    Asr: '',
    Sunset: '',
    Maghrib: '',
    Isha: '',
    dataDay:'',

  });
  
  const [loading, setLoading] = useState(true);
 
  const countrysite = [
    
    {name: "مصر" , city: [ "اسكندريه", " القاهره" , "الشرقيه" ]},
    {name: "السعوديه" , city: [ "الرياض", "   مكه المكرمه" , "المدينه" ]},
    {name: "الامارات" , city: [ "دبي", " ابوظبي" , "الشارقه" ]},
    
  ]
  const [selectCountry , setSelectCountry ] = useState(window.localStorage.getItem("country") || "");
  const [City , setCity ] = useState(window.localStorage.getItem("city") || "" );
  function handlCityChange(e){
    setCity(e.target.value);
    window.localStorage.setItem("city" , e.target.value)
    
    
    

  }
  
  const handleCountryChange = (e) => {
    setSelectCountry(e.target.value);
    window.localStorage.setItem("country" , e.target.value)
    
   

  }
  const selectCity = countrysite.find(
    (country) => country.name === selectCountry
  )?.city || [];
  const translationMap = {
    "مصر": "Egypt",
    "السعوديه": "Saudi Arabia",
    "الامارات": "United Arab Emirates",
    "اسكندريه": "Alexandria",
    "القاهره": "Cairo",
    "الشرقيه": "Sharqia",
    "الرياض": "	Ar Riyāḑ",
    "مكه المكرمه": "Makkah al Mukarramah",
    "المدينه": "Al Madīnah al Munawwarah",
    "دبي": "Dubai",
    "ابوظبي": "Abu Dhabi",
    "الشارقه": "	Sharjah"
  };

  
  
  useEffect( ()=>{
    
    const translatecity = translationMap[City] || translationMap[window.localStorage.getItem("city")];
      const translateCountry = translationMap[selectCountry] || translationMap[window.localStorage.getItem("country")];
    
    const apiData = `http://api.aladhan.com/v1/timingsByCity?city=${translatecity}&country=${translateCountry}&method=8`
    if( City ){
      
      
      axios.get(apiData)
       .then((response)=> {
         
         
         const dataDay = response.data.data.date.readable;
       
        
        const responseData = response.data.data.timings ;
        const Fajr = responseData.Fajr
        
        const Dhuhr = responseData.Dhuhr;
        const Asr = responseData.Asr;
        
        const Maghrib = responseData.Maghrib;
        const Isha = responseData.Isha;
        const Timetamp = response.data.data.date.timestamp;
        setdata({
         
            Fajr,
         
            Dhuhr,
            Asr,
          
            Maghrib,
            Isha,
            dataDay,
            Timetamp
          })
          setLoading(false)
          
          
          // console.log(responseData.timings)
          
        })
    }
    
   } , [ City  ])

  const fajr = data.Fajr;
  const dhuhr = data.Dhuhr;
  const asr = data.Asr;
  const maghrib = data.Maghrib;
  const isha = data.Isha;









  
  
 
  
  
  
  

  

   
  
 
    
  return (
  <Container  className='container'>
  <div className='DateLocation'>
  <Typography variant='h3' sx={{
    marginTop: '10px',
    fontSize: '40px',
    textAlign: 'center',
    color: grey[200],
  }}>

  {data.dataDay}
  </Typography>

<h2 className='location'>{City}</h2>

  
  


  
  

  </div>
  <hr></hr>
<div className='timing'>

  <Timing    data = {fajr} name="الفجر" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDrSgmUUy9W2vXoHhSPUNzZLB-ka9GrR14g&s"/>
  <Timing    data = {dhuhr} name="الضهر" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM43LsxXX4f2iZeS3A7ztAu772nWd5ru3Usg&s"/>
  <Timing    data = {asr} name="العصر" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4tP4us7hM3GB73lE0eTPsR-zTwkF4MTKFg&s" />
 
  <Timing    data = { maghrib} name=" المغرب" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluaq1yAqVmt9Cc7lNuioch6pJzX9TDFpflw&s" />
  <Timing    data = { isha}  name="العشاء " img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF64mIPHnRcishqRyW3qagXKJvPXaZiNBjQA&s" />
</div>
<div  style={{ width: "100%" , display:"flex" , justifyContent:"center" , alignItems:"center", gap: "20px" , marginTop:"20px"  }}>

<select  style={{ width: "200px" , fontSize:"25px" , fontWeight: "800"  }} onChange={handleCountryChange} value={localStorage.getItem("country")}>
 {countrysite.map((country)=>{
   return <option key={country.name} value={country.name}>{country.name}</option>
 })}
</select>
<select  style={{ width: "200px" , fontSize:"25px" , fontWeight: "800"  }}  onChange={handlCityChange}>

 {selectCity.map((city)=>{
   return <option key={city} value={city ||  window.localStorage.getItem( JSON.stringify("city"))}>{city}</option>
   


 })}
</select>

</div>
 
   
  </Container>
  )
}

