const BASE_URL = 'https://api.api-ninjas.com/v1/cars?'
const selectBrand = document.getElementById('carBrand')
const selectModel = document.getElementById('carModel')
const button = document.getElementById('findButton')

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
    .then(data => console.log(data))
})