const searchPhone = () =>{
const searchField = document.getElementById('search-field')
const serchText = searchField.value

const url = `https://openapi.programming-hero.com/api/phones?search=${serchText}`
fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
//clear input field:
searchField.value = ''
}

const displayResult = phones => {
    ////------:get container from Html file:---------
    const searchResult = document.getElementById('search-result')

    // clear div at new search:---
    searchResult.innerText = ''
    // // find all elements in arreay using forEach loop:---------
    phones.forEach(phone => {
        // console.log(phone) 
        // // // Create Div and add class: ----------
        const div = document.createElement('div')
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">            
            <img src="${phone.image}" class="card-img-top" alt="...">   
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <h5 class="card-title">${phone.slug}</h5>
                <a onClick="displayDetail('${phone.slug}')" href="#" class="btn btn-primary">Detail</a>
            </div>
        </div>
        `                   
        //---------: Append Created Div as child In HTML DIV:----------
        searchResult.appendChild(div)
    })
}

// phone detail
const displayDetail = (detail) => {
    const url =`https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
    // console.log(url)
    .then(res => res.json())
    .then(data =>  singleItem(data))

    const singleItem = itemDetail=>{
        // console.log(itemDetail.data)

    const detailDiv = document.getElementById('detail')
    //clear detail
    detailDiv.innerText = ''
    const div = document.createElement('div')
    div.classList.add("card")
        div.innerHTML = `
            <div class="card h-100">            
                <img src="${itemDetail.data.image}" class="card-img-top" alt="...">   
                <div class="card-body">
                    <h5 class="card-title">${itemDetail.data.name}</h5>
                    <h5 class="card-title">${itemDetail.data.brand}</h5>
                    <h5 class="card-title">${itemDetail.data.releaseDate}</h5>
                </div>
            </div>
            ` 
    detailDiv.appendChild(div) 
    }




   
}
