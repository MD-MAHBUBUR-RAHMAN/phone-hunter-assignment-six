//// Search field and get api:---
const searchPhone = () =>{
const searchField = document.getElementById('search-field')
const serchText = searchField.value
const url = `https://openapi.programming-hero.com/api/phones?search=${serchText}`
fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
//// clear input field:
searchField.value = ''
}

const displayResult = phones => {
    ////------:get container from Html file:---------
    const searchResult = document.getElementById('search-result')
    //// clear previous search result at new search:---
    searchResult.innerText = ''
    //// find all elements in the arreay using forEach loop:---------
    phones.forEach(phone => {
        //// Create Div and add class: ----------
        const div = document.createElement('div')
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">            
            <img src="${phone.image}" class="card-img-top w-50 mx-center" alt="...">   
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <h5 class="card-title">${phone.slug}</h5>
                <a onClick="displayDetail('${phone.slug}')" href="#" class="btn btn-primary">Detail</a>
            </div>
        </div>
        `                   
        ////---------: Append Created Div as child In HTML DIV:----------
        searchResult.appendChild(div)
    })
}

//// phone detail
const displayDetail = (detail) => {
    const url =`https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data =>  singleItem(data))
    //// function:===
    const singleItem = itemDetail=>{
        //// console.log(itemDetail.data)
    const detailDiv = document.getElementById('detail')
    ////clear detail
    detailDiv.innerText = ''
    const div = document.createElement('div')
    div.classList.add("card")
        div.innerHTML = `
            <div class="card h-100">            
                <img src="${itemDetail.data.image}" class="card-img-top" alt="...">   
                <div class="card-body">
                    <h3 class="card-title">${itemDetail.data.name}</h3>
                    <h4 class="card-title">${itemDetail.data.brand}</h4>
                    <h5 class="card-title">${itemDetail.data.releaseDate}</h5>
                    <h4 class="card-title text-center"> Main Feature </h4>
                    <p class="card-text"> Storage: ${itemDetail.data.mainFeatures.storage}</p>
                    <p class="card-text"> Display Size: ${itemDetail.data.mainFeatures.displaySize}</p>
                    <p class="card-text"> Chip Set: ${itemDetail.data.mainFeatures.chipSet}</p>
                    <p class="card-text"> Memory:${itemDetail.data.mainFeatures.memory}</p>
                    <h4 class="card-title text-center"> Sensor </h4>
                    <p class="card-text">${itemDetail.data.mainFeatures.sensors[0]}, ${itemDetail.data.mainFeatures.sensors[1]}, ${itemDetail.data.mainFeatures.sensors[2]}, ${itemDetail.data.mainFeatures.sensors[3]}, ${itemDetail.data.mainFeatures.sensors[4]}, ${itemDetail.data.mainFeatures.sensors[6]}</p>
                    <h4 class="card-title text-center"> Other Information </h4>
                    <p class="card-text"> WLAN: ${itemDetail.data.others.WLAN},  Blutooth: ${itemDetail.data.others.Bluetooth}, Gps: ${itemDetail.data.others.GPS},  NFC: ${itemDetail.data.others.NFC}, Radio: ${itemDetail.data.others.Radio}, USB: ${itemDetail.data.others.USB}</p>
                </div>
            </div>
            ` 
    detailDiv.appendChild(div) 
    }   
}