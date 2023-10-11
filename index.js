const BASE_URL = 'https://api.api-ninjas.com/v1/cars?'
const selectBrand = document.getElementById('carBrand')
const selectModel = document.getElementById('carModel')
const button = document.getElementById('findButton')
const modalText = document.getElementById('modalText')
const modalTitle = document.getElementById('exampleModalLabel')


selectBrand.addEventListener('change', ()=>{
    
    const value = selectBrand.value

    while (selectModel.firstChild) {
        selectModel.removeChild(selectModel.firstChild);
    }

    selectModel.innerHTML = '<option value="" disabled selected>Select a model</option>'

    if(value === ''){
        selectModel.disabled = true;
    }
    else{
        selectModel.disabled = false;
    }

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
            option.textContent = car.model

            selectModel.appendChild(option)

        }
    } )
    .catch(error => console.error('Error:', error))
})

button.addEventListener('click', ()=>{
    const brandValue = selectBrand.value
    const modelValue = selectModel.value


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

            modalText.innerHTML = ''
            modalTitle.textContent = ''

            for (const car of data) {
                fuelType.textContent = `Fuel Type: ${car.fuel_type}`
                engineCC.textContent = `Engine CC: ${car.displacement}`
                driveType.textContent = `Drive Type: ${car.drive}`
                classType.textContent = `Class: ${car.class}`

                modalTitle.textContent = `${car.make}-${car.model}`.toUpperCase()

                modalText.appendChild(fuelType)
                modalText.appendChild(engineCC)
                modalText.appendChild(driveType)
                modalText.appendChild(classType)

            }
    })
})