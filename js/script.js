const btnAjouter = document.querySelector("#Ajouter");
const formAjouter = document.querySelector("#formulaire");
const btnanuler = document.querySelector("#anuler");
const form = document.querySelector("form");
 
btnAjouter.addEventListener("click", function(e) 
{
    btnAjouter.style.display = "none";
    formAjouter.style.display = "block";
});
btnanuler.addEventListener("click", function(e) 
{
    btnAjouter.style.display = "block";
    formAjouter.style.display = "none";
});



form.addEventListener("submit", function(e)
{  
    //alert("merci");
   //console.log(this.elements);
   let tr = document.createElement("tr")
   for (ele of this.elements)
   {
       //console.log(ele.name);
       if(ele.name != "ajouter" && ele.name != "anuler")
       {
           if (ele.name == "age") 
           {
                let entre = document.createElement("th");
                entre.textContent = ele.value;
                tr.append(entre);   
           }
           else
           {
               if (ele.value != "") 
               {
                    let entre = document.createElement("th");
                    entre.textContent = ele.value;
                    document.querySelector("#erreur").innerHTML = "";
                    tr.append(entre);                   
               }
               else
               {
                   document.querySelector("#erreur").innerHTML = `<p> remplissez  le champ ${ele.name}`;
                   tr.innerHTML = "";
                   break;
                   
               }
           }
       }

       
   } 
   //console.log(tr);
   
   if(tr.childElementCount) {
       document.querySelector("tbody").append(tr);
       btnAjouter.style.display = "block";
       formAjouter.style.display = "none";
       this.reset();
   }
  e.preventDefault();
   
    
})
