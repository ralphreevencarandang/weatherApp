


const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const APIkey = "eb9fcdb7d083e317cd82fcc0f6478502";
const weatherForm = document.querySelector('.weatherForm');



weatherForm.addEventListener('submit', async (event)=>{

    event.preventDefault();

    try{
 
        const city = cityInput.value;

        if(city){
            const data = await getWeatherData(city);
            displayWeatherInfo(data);
       
        }else{
            displayError('Please Enter a city')
        
        }

       

        

    }catch(error){
        console.log(error)
    }
});


async function getWeatherData(city){

    try{

        let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
        const response = await fetch(APIurl);

        if(!response.ok){
            throw new Error("Couldn't get resource");
            
        }

        const data = await response.json();

        return data;

        

    }catch(error){
        displayError(error)
    }

}

function displayWeatherInfo(data){
    const {name, weather:[{description, main,id}], main:{temp,humidity}} = data; 
    console.log(name)
    console.log(description)
    console.log(main)
    console.log(id)
    console.log(temp)
    console.log(humidity)

    card.style.display = 'flex';
    card.textContent  = "";


    const cityName = document.createElement('h1');
    cityName.textContent = name;
    cityName.classList.add('cityDisplay');
    card.appendChild(cityName);
    
    const tempDisplay = document.createElement('p');
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add('tempDisplay');
    card.appendChild(tempDisplay);


    const humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');
    card.appendChild(humidityDisplay);


    const descDisplay = document.createElement('p');
    descDisplay.textContent = description;
    descDisplay.classList.add('descDisplay');
    card.appendChild(descDisplay);

    const displayEmoji = document.createElement('p');
    displayEmoji.textContent = getWeatherEmoji(id);
    displayEmoji.classList.add('displayEmoji');
    card.appendChild(displayEmoji);






 

    

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return '⚡';
        case (weatherId >= 300 && weatherId < 500):
            return '🌨';
        case (weatherId >=500 && weatherId < 600):
            return '☔';
        case (weatherId >=600 && weatherId < 700):
            return '❄';
        case (weatherId >=700 && weatherId < 800):
            return '🌫';
        case (weatherId == 800):
            return '⛅';
        case (weatherId > 800):
            return '⛅';
        default:
            return 'burat';
        
            
    }

}

function displayError(message){
   
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.appendChild(errorDisplay);
    console.log(message)
    card.style.display = 'flex';



}