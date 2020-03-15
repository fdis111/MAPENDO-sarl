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
    
    let ligne = document.createElement("tr"); 
    for (champ of form.elements)
    {
        let entre = document.createElement("th");
        entre.textContent = champ.value;
        ligne.append(entre);
    }
    document.querySelector("tbody").append(ligne)
    e.preventDefault();
    e.target.reset();
    formAjouter.style.display = "none";
    btnAjouter.style.display = "block";
})
