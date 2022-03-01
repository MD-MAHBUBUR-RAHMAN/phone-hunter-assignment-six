document.getElementById('empty').style.display = 'none'
document.getElementById('number').style.display = 'none'
document.getElementById('falsy').style.display = 'none'
const falsy = ()=>{}
//// Search field and get api:---
const searchPhone = () =>{
const searchField = document.getElementById('search-field')
const serchText = searchField.value
//// clear input field:
searchField.value = ''
//// Error
if(serchText ===''){
    document.getElementById('empty').style.display = 'block'
    document.getElementById('number').style.display = 'none'
    document.getElementById('falsy').style.display = 'none'
}else if(!isNaN(serchText)){
    document.getElementById('number').style.display = 'block'
    document.getElementById('empty').style.display = 'none'
    document.getElementById('falsy').style.display = 'none'
}else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${serchText}`
    fetch(url)
        .then(res => res.json())
        .then(data =>{if(data.status === false){
            document.getElementById('falsy').style.display = 'block'
            document.getElementById('empty').style.display = 'none'
            document.getElementById('number').style.display = 'none'
        }else{displayResult(data.data.slice(0,20))}} )
}

//// clear previous single detail search result:
const detailDiv = document.getElementById('detail') 
detailDiv.innerText = ''
}


const displayResult = phones => {
    document.getElementById('empty').style.display = 'none'
    document.getElementById('number').style.display = 'none'
    document.getElementById('falsy').style.display = 'none'
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
            <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">   
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-title">${phone.brand}</h6>
                <a onClick="displayDetail('${phone.slug}')" href="#" class="btn btn-primary">Detail</a>
            </div>
        </div>
        `                   
        ////---------: Append Created Div as child In HTML DIV:----------
        searchResult.appendChild(div)
    })
}

//// phone detail ---------------------------------------------------------
const displayDetail = (detail) => {
    const url =`https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data =>  singleItem(data))
    //// function:===
    const singleItem = itemDetail=>{
    //// get html element:======
    const detailDiv = document.getElementById('detail')
    ////clear detail
    detailDiv.innerText = ''
    const div = document.createElement('div')
    div.classList.add("card")
    div.innerHTML = `
        <div class="card h-100">            
            <img src="${itemDetail.data.image}" class="card-img-top w-50 mx-auto mt-3" alt="...">   
            <div class="card-body">
                <h3 class="card-title">${itemDetail.data.name}</h3>
                <h4 class="card-title">${itemDetail.data.brand}</h4>
                <h6 class="card-title">${itemDetail.data.releaseDate??'Data Is Not Available'}</h6>
                <h4 class="card-title text-center"> Main Feature </h4>
                <p class="card-text"> Storage: ${itemDetail.data.mainFeatures?.storage ?? 'No storage'}</p>
                <p class="card-text"> Display Size: ${itemDetail.data.mainFeatures?.displaySize ?? 'Standerd'}</p>
                <p class="card-text"> Chip Set: ${itemDetail.data.mainFeatures?.chipSet ?? 'Reguler'}</p>
                <p class="card-text"> Memory:${itemDetail.data.mainFeatures?.memory ?? 'No memory Slot'}</p>
                <h4 class="card-title text-center"> Sensor </h4>
                <p class="card-text">${itemDetail.data.mainFeatures?.sensors[0] ?? 'There is no sensore includes'} ${itemDetail.data.mainFeatures?.sensors[1] ?? '.'}, ${itemDetail.data.mainFeatures?.sensors[2] ?? '.'} ${itemDetail.data.mainFeatures?.sensors[3] ?? '.'} ${itemDetail.data.mainFeatures?.sensors[4] ?? '.'} ${itemDetail.data.mainFeatures?.sensors[6] ?? '.'}</p>
                <h4 class="card-title text-center"> Other Information </h4>
                <p class="card-text"> WLAN: ${itemDetail.data.others?.WLAN ?? 'NO'},  Blutooth: ${itemDetail.data.others?.Bluetooth ?? 'NO'}, Gps: ${itemDetail.data.others?.GPS ?? 'NO'},  NFC: ${itemDetail.data.others?.NFC ?? 'NO'}, Radio: ${itemDetail.data.others?.Radio ?? 'NO'}, USB: ${itemDetail.data.others?.USB ?? 'NO'}</p>
            </div>
        </div>
            ` 
         // console.log(itemDetail.data.mainFeatures.sensors)
    detailDiv.appendChild(div) 
    }   
}