import React , { useState, useEffect, useImperativeHandle } from 'react';
import './App.css';
import DatePicker from 'react-date-picker';
import 'react-day-picker/lib/style.css';









function App() {

  const[searchText, setSearchText] = useState('');

  var [ordersArray, setOrdersArray] = useState([]);

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  


  

  useEffect(() => {

    fetch('http://localhost:5000/orders?page=1&limit=5')
    .then(response => response.json())
    .then(data => setOrdersArray(data));

  }, []);


  useEffect(() => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ find: searchText })
  };
  fetch('http://localhost:5000/orders/find', requestOptions)
      .then(response => response.json())
      .then(data => setOrdersArray(data));

  }, [searchText]);



  useEffect(() => {
    


    if(startDate != null && endDate != null)
    {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: startDate, endDate: endDate })
    };
    fetch('http://localhost:5000/orders/datefilter', requestOptions)
        .then(response => response.json())
        .then(data => setOrdersArray(data));


    }

    

  }, [endDate]);




 
  



  function Header()
  {
    return <h1>Shoping Cart</h1>
  }

  function Items()
  {


    






  return <table class="TableCenter1">

    <thead>



    <tr>
        
        <th> 
          
        <label>Search:</label>

      
<input name="searchtext" value={searchText} onChange={(e) => {
  
  setSearchText(e.target.value);
  console.log("entered value:" + searchText);
  //searchDatabase();

}
  
  
  } />

          </th> 



          <th>

          <label>Start Date:</label>

<DatePicker selected={startDate} onChange={date => {
        
        setStartDate(date)
        console.log("startdate:" + startDate);
        }} />


          </th>


          <th>

          <label>End Date:</label>        


<DatePicker selected={endDate} onChange={date => {
        
        setEndDate(date)
        console.log("enddate:" + endDate);



        }} />




            
          </th>
        
        
        </tr>


    

    </thead>

    <tbody>


    <tr><th>Order Name</th><th>Customer Company</th><th>Customer Name</th><th>Order Date</th></tr>


      {
      

      ordersArray.map(postDetail=>
        

         
        <tr key = {postDetail.order_name}>
         
          <td>{postDetail.order_name}</td>
          <td>{postDetail.company_name}</td>
          <td>{postDetail.name}</td>
          <td>{postDetail.created_at}</td>

        </tr>)
        

      }



      

    


      </tbody>

  </table>

  
    
  

  }

  function Footer()
  {
  return <select value="Radish">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
  //return <h2>fffff</h2>
  }

  


 


  return (
    

   

    <div className="App">




      <Header/>

      <Items />
      <Footer />

    
      
    </div>
  );

  



}

export default App;
