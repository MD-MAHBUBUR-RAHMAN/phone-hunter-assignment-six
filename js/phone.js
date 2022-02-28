const searchPhone = () =>{
const searchField = document.getElementById('search-field')
const serchText = searchField.value

const url = `https://openapi.programming-hero.com/api/phones?search=${serchText}`
fetch(url)
.then(res => res.json())
.then(data => displayResult(data.data))

    searchField.value = ''
}
const displayResult = (phones) => {
    // // //get container from Html file where result will  be displaied:---------
    const searchResult = document.getElementById('search-result')
    // // //find all elements in arreay using forEach loop:---------
    phones.forEach(phone => {
        // console.log(phone) 
        // // // Create Div and add class: ----------
        const div = document.createElement('div')
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top " alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text"></p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `                   
        //---------: Append Created Div as child In HTML DIV:----------
        searchResult.appendChild(div)
    })
}

// onClick="phoneDetail(${phone})"
