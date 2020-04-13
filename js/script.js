const btnAjouter = document.querySelector("#Ajouter");
const formAjouter = document.querySelector("#formulaire");
const btnanuler = document.querySelector("#anuler");
const form = document.querySelector("form");

const modale1 = document.querySelector("#modale");
btnAjouter.addEventListener("click", function(e) 
{
    btnAjouter.style.display = "none";
    formAjouter.style.display = "block";
    form.reset();
});
btnanuler.addEventListener("click", function(e) 
{
    btnAjouter.style.display = "block";
    formAjouter.style.display = "none";
    form.reset();
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
       const employers = document.querySelectorAll("tbody th");
       let suprimer = document.querySelector("#suprimer");
       for(employer of employers)
       {
            employer.addEventListener("click", function (e) 
            {
                modale1.style.display = "flex";
                let obj = this;
                suprimer.addEventListener("click", function(e)
                {
                    // obj.parentNode.remove();
                    // tr.removeChild(obj);
                    // document.querySelector("tbody").removeChild(obj.parentNode);
                    document.querySelector("tbody").remove(obj.parentNode);
                    modale1.style.display = "none";
                });
                let modifier = document.querySelector("#modifier");
                modifier.addEventListener("click", function(e)
                {
                  let a = obj.parentNode.childNodes;
                  for (let j = 0; j < a.length; j++)
                  {
                    form.elements[j].value = a[j].textContent;
                  }
                //   console.log(z.textContent)
                // console.log(a[0].textContent);
                // modale1.style.display = "none";
                formAjouter.style.display = "block";
                    modale1.style.display = "none";
                    btnanuler.textContent = "Supprimer"
                    document.querySelector("tbody").remove(obj.parentNode);
                })
                btnanuler.textContent = "Anuler"
            })
        }
   }
  e.preventDefault();
})
let quiter = document.querySelector("#quiter");

quiter.addEventListener("click", function(e)
{
    modale1.style.display = "none";
})