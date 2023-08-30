const loadPhone = async(searchText,isShowAll) =>{
const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);

    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll ) =>{
    //console.log(phones);
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = " ";

     const showAllContainer = document.getElementById("show-all-container");
     if(phones.length>12 && !isShowAll ){
      showAllContainer.classList.remove("hidden");
     }
else{
  showAllContainer.classList.add("hidden");
}
   console.log("is show all", isShowAll);
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    
    phones.forEach((phone) => {
        //console.log(phone);

        const phoneCard = document.createElement("div");
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl `;
        phoneCard.innerHTML = `   
        
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name }</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button  onclick="handleShowDetails('${phone.slug}'),show_details_modal.showModal()"  class="btn btn-primary">Show details</button>
          </div>
        </div>
      
        `;
        phoneContainer.appendChild(phoneCard);
        
    });
   
}

const handleSearch = (isShowAll) =>{
  //console.log("handlesearch")
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value ;
  //console.log("searchText") ;
  loadPhone(searchText);
}

const handleSearch2 = () =>{
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value ;
  loadPhone(searchText);
}

const handleShowDetails =async(id) =>{
 handleSearch(true);
 //loadPhone(searchText, isShowAll);
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data = await res.json();
 console.log(data.data);
  
showPhoneDetails()


}
const showPhoneDetails = (phone) => {
  show_details_modal.showModal(phone);
  console.log(phone);

  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerHTML = phone.name ;

  const showDetailsContainer = document.getElementById("show-detail-container");

   showDetailsContainer.innerHTML = `
   <img src = "${phone.image}"
   <p><span>storege:</span>${phone?.mainFeatures?.storage}</p>
   <p><span>GPS:</span>${phone?.others?.GPS || 'no GPS'}</p>

   `
  

}



loadPhone();