let form = document.querySelector("form");
let user_in = document.getElementById("user-input");
form.addEventListener("submit",searchQuery)

function searchQuery(e){
    // console.log(e);
    let search = user_in.value;
    let searchMain = search.toLowerCase();
    e.preventDefault();
//Checking Whether The Search is empty or not
    if(search == "")
    {
      user_in.placeholder = "The Search Cannot Be Empty!";
    }
    else{
    runSearch(searchMain);
    }

}
//Search Function
  function runSearch(val){
  let contents = "";
  //Fetching The Data From Api
   $.getJSON(`https://api.edamam.com/search?q=${val}&app_id=a4ce8986&app_key=a15ad0b9431418589b709bcbefb0d42e`,function(data){
              // console.log(data.hits);
             let mainData = data.hits;
             if(mainData.length == 0 )
             {Swal.fire(
              'Something Went Wrong.. Please Retry!',
              'Check Your Food"s Spelling ',
              'warning'
            )}
             else{
             
                let i=0;
            while(i < 9){
                contents +=
                //Adding The Data To HTML 
                ` <div class="col-sm-12 col-md-6 mb-6 col-lg-4 mb-5 text-center">
                <div class="card">
                    <img class="card-img-top img-fluid" src="${mainData[i].recipe.image}" alt="Card cap">
                    <div class="card-body">
                      <h5 class="card-title">${mainData[i].recipe.label}</h5>
                      <h6><span class="source ">Source: </span> ${mainData[i].recipe.source}</h6>
                      <h6><span class="calories ">Calories:</span>${Math.floor(mainData[i].recipe.calories)}</h6>
                      <h6><span class="disgest">${mainData[i].recipe.digest[0].label}</span> : ${Math.floor(mainData[i].recipe.digest[0].total)} </h6>
                      <h6><span class="disgest">${mainData[i].recipe.digest[2].label} </span>  :  ${Math.floor(mainData[i].recipe.digest[2].total)} </h6>
                      <a href="${mainData[i].recipe.shareAs}" target="_blank" class="btn recipe-btn">Get Full Recipe</a>
                    </div>
                  </div>
               </div>
                `
                i++;
            } 
              document.getElementById("Get-more").style.opacity ="1";

             }
             let row = document.getElementById("row");
             row.innerHTML = contents;
        });
      
        //  console.log(val);
        }