/* Global Variables */
// Base URL & Api Key https://home.openweathermap.org/
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "dd388d7c2a31dd10112ce8d5a33d9b12&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
// Function called by event listener
document.getElementById("generate").addEventListener("click", function() {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;


     // to check that we fetch dumy data !!
    if (!zipCode) {
        alert("please enter zip code !!!");

    } else if(!feelings){

        alert("please enter feelings !!!");
    } else
    
    /* Function to GET Web API Data*/
    {
        fetchWeatherData(baseURL, zipCode, apiKey)
    .then( data  => {
        postData("/addData", {date: newDate, temp: data.main.temp, feelings})
    })
    // Call update UI Function
    .then(() => updateUI())
}
});

// Function to GET Web API Data
const fetchWeatherData = async(baseURL, zipCode, apiKey) => {
    const res = await fetch(`${baseURL}${zipCode},&appid=${apiKey}`);
    try {
        const data = await res.json();
        console.log('here is data :',data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Function to POST data
const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.error(error);
    }
};

//Update UI by Project Data
const updateUI = async () => {
    const Request = await fetch("/data");
    try {
        const allProData = await Request.json();
        // Update New Data
        document.getElementById("date").innerHTML = `Date: ${allProData.date}`;
        document.getElementById("temp").innerHTML = `Temp: ${allProData.temp}`;
        document.getElementById("content").innerHTML = `Feeling: ${allProData.feelings}`
    } catch (error) {
        console.error(error);   
    }
}