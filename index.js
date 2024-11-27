var webName=document.getElementById('site-name');
var siteURL=document.getElementById('site-url');  
var siteContainer=document.getElementById('demo');

var URL_List=JSON.parse(localStorage.getItem('site'))||[] ;
displayData(URL_List);

function addURL() { 
    if (validateAllInputs()) {
        var sites={ 
            sitesName:webName.value,
            sitesLinks:siteURL.value,
        } 
        URL_List.push(sites); 
        displayData(URL_List);  
        localStorage.setItem("site",JSON.stringify(URL_List)); 
        Swal.fire({
            title: "Good job!",
            text: "Added Successfully",
            icon: "success"
          });
        clearForm();
    }else{ 
        Swal.fire({
            title: "Site Name or Url is not valid",
            text: "Rules:: Site name must contain at least 5 characters & Site URL must be a valid one",
            icon: "error"
          }); 
          clearForm();

    }
  

    
} 

function displayData(array) {
    var cartona='';
    for(var i=0;i<array.length;i++){ 
        cartona+=`  <tr> 
          <td>${i+1}</td>
          <td>${array[i].sitesName}</td>
          <td>  
             <button class="btn btn-success"><a href="${array[i].sitesLinks}" class="text-decoration-none text-light" target="blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button>
            </td>
          <td>    
           <button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
        </td>
        </tr>`
    } 
    siteContainer.innerHTML=cartona; 
} 
function deleteSite(index){  
    URL_List.splice(index,1); 
    displayData(URL_List); 
    localStorage.setItem("site",JSON.stringify(URL_List));

} 
function clearForm() {
    webName.value=null;
    siteURL.value=null; 
} 

function validate(regex,inputValue,input) {
    if (regex.test(inputValue)) {
        input.classList.replace("is-invalid","is-valid"); 
        return true;
    }else{ 
        input.classList.add("is-invalid");
        return false;
    }
} 
function validateAllInputs() {
    if (
        validate(/^[\w\s]{5,20}?/,webName.value,webName)&&
        validate(/(?:https?|ftp):\/\/(?:www\.)?[\w-]+\.[a-z]{2,}(?:\/[^\s]*)?/,siteURL.value,siteURL)

 ){ 
        return true;
        
    } else{ 
        return false;
    }
}