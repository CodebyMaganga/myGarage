
//Variables
const BASE_URL = 'https://api.api-ninjas.com/v1/cars?'
const selectBrand = document.getElementById('carBrand')
const selectModel = document.getElementById('carModel')
const button = document.getElementById('findButton')
const modalText = document.getElementById('modalText')
const modalTitle = document.getElementById('exampleModalLabel')
const headerButton = document.getElementById('headerButn')
const emailInput = document.getElementById('emailInput')
const messageInput = document.getElementById('commentInput')
const messageButton = document.getElementById('messageButton')

//Fetches API data that enables user to choose from a brand of cars
selectBrand.addEventListener('change', ()=>{
    
    const value = selectBrand.value


    while (selectModel.firstChild) {
        selectModel.removeChild(selectModel.firstChild); //clears previous content if any
    }

    selectModel.innerHTML = '<option value="" disabled selected>Select a model</option>'  //If user hasn't selected a car brand,model option is disabled

    if(value === ''){
        selectModel.disabled = true;
    }
    else{
        selectModel.disabled = false;
    }
    
    //Fetch API data and append data to brand form
    fetch(`${BASE_URL}make=${value}`, {
        method: 'GET',
        headers:{
            'X-Api-Key': 'a0XuZSUmy8Byd7LaM2oQ1Q==C124vfEV3RLla1W5',
            'Content-type': 'applications/json'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        for (const car of data) {
            const option = document.createElement('option')
            option.value = car.model
            option.textContent = `${car.model} ${car.year}`

            selectModel.appendChild(option)

        }
    } )
    .catch(error => console.error('Error:', error))
})

//Modal displays with data info after button is clicked
button.addEventListener('click', ()=>{
    const brandValue = selectBrand.value
    const modelValue = selectModel.value

    //Fetches API data according to user's selection of car brand and model 
    fetch(`${BASE_URL}make=${brandValue}&model=${modelValue}`,{
        method: 'GET',
        headers:{
            'X-Api-Key': 'a0XuZSUmy8Byd7LaM2oQ1Q==C124vfEV3RLla1W5',
            'Content-type': 'applications/json'
        }

    })
    .then((resp)=> resp.json())
    .then((data) => {
            const fuelType = document.createElement('p')
            const engineCC = document.createElement('p')
            const driveType = document.createElement('p')
            const classType = document.createElement('p')
            const fuelConsumption = document.createElement('p')

            modalText.innerHTML = '' //clears previous text if any
            modalTitle.textContent = '' //clears previous text if any

            // Setting up modal display content
            for (const car of data) {
                modalTitle.textContent = `${car.make}-${car.model}`.toUpperCase()

                fuelType.textContent = `Fuel Type: ${car.fuel_type}`
                engineCC.textContent = `Engine CC: ${(car.displacement) * 1000}`
                driveType.textContent = `Drive Type: ${car.drive}`
                classType.textContent = `Class: ${car.class}`
                fuelConsumption.textContent = `Fuel Consumption: ${Math.round(((car.combination_mpg * 1.609) / 4.546))} litres/km`

                //Append data to modal
                modalText.appendChild(fuelType)
                modalText.appendChild(engineCC)
                modalText.appendChild(driveType)
                modalText.appendChild(classType)
                modalText.appendChild(fuelConsumption)


            }
          
    })
})

//Scroll to form section when clicked
headerButton.addEventListener('click', ()=>{
    console.log('I have been clicked')
    selectBrand.scrollIntoView({behavior: 'smooth'})
    
})

//Button sends an alert when clicked
messageButton.addEventListener('click', ()=>{
    
    if(!messageInput.value){
        alert('Cant send an empty message')
    }else{
        alert('Your message has been sent.Thank you for contacting us')
    }

    
})