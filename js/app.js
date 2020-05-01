// les variables
const btnAjouter = document.querySelector("#Ajouter");
const btnanuler = document.querySelector("#anuler");
const formulaire = document.querySelector("form");
const blockFormulaire = document.querySelector("#formulaire");
let employerInfos = {};
const messageErreur = document.querySelector("#erreur");
const tableauEmployers = document.querySelector("#employersTable");
const tableau = document.querySelector("tbody");


// les evenements de base

btnAjouter.addEventListener("click", function()
{
    this.style.display = "none";
    blockFormulaire.style.display = "block";
    tableauEmployers.style.display = "none";
})

btnanuler.addEventListener("click", function()
{
    blockFormulaire.style.display = "none";
    btnAjouter.style.display = "block";
    tableauEmployers.style.display = "block";
    messageErreur.innerHTML = "";
    // formulaire.reset();
})


// les fonctions


// recuper la longeur d'un objet
const tailleObjet = function(obj) {
    let taille = 0; 
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) taille++;
    }
    return taille;
};
// preremplir le formulaire en cas de modification
const preremplirFormulaire = function(data)
{
      formulaire.elements.nom.value = data.nom;
      formulaire.elements.prenom.value = data.prenom;
      formulaire.elements.email.value = data.email;
      formulaire.elements.poste.value = data.poste;
      formulaire.elements.telephone.value = data.numeroTelephone;
    //   formulaire.elements.statut.value = data.estMarie ? "Marié(e)" : "Celibataire";
      formulaire.elements.pays.value = data.pays;
      formulaire.elements._id.value = data._id;
      formulaire.elements.ajouter.value = "Modifier";
      blockFormulaire.style.display = "block";
}


// les requtes ajax


// 1 get all employers
const getEmployers = async function () 
{
    tableau.innerHTML = ""
    try 
    {
        const url = "http://167.71.45.243:4000/api/employes?api_key=kewilah";
        const response = await fetch(url);
        if (response.ok) 
        {
            const data = await response.json();
        
            for (user of data)
            {
                const ligne = document.createElement("tr");
                ligne.innerHTML = `
                <td>${user.nom}</td>
                <td>${user.prenom}</td>
                <td>${user.email}</td>
                <td>${user._id}</td>
                <td>${user.poste}</td>
                <td>${user.numeroTelephone ? user.numeroTelephone : ""}</td>
                <td>${user.estMarie == true ? "Marié(e)" : "Celibataire"}</td>
                <td>${user.pays}</td>
                <td><button class="ui green button modifier" id="edit-${user._id}">Modifier</button></td>
                <td><button class="ui red button supprimer" id="delete-${user._id}">Supprimer</button></td>`;
                tableau.appendChild(ligne);
                const supprimer = document.getElementById(`delete-${user._id}`);
                const modifier = document.getElementById(`edit-${user._id}`)
                const id = user._id;
                const EmployerAmodifier = user;
                supprimer.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    const confirmer = confirm(`voulez vous supprimer ${EmployerAmodifier.nom} ${EmployerAmodifier.prenom}`);
                    if (confirmer) 
                    {
                        deleteEmployer(id);
                    }
                });
                modifier.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    preremplirFormulaire(EmployerAmodifier);
                    tableauEmployers.style.display = "none";
                })
            }
        }  
    } 
    catch (error) 
    {
         console.log(error);
    }    
}

getEmployers();


// 2 get one employer
const getOneEmployer = async function (employerId)
{

    try
    {
        const url = `http://167.71.45.243:4000/api/employes/${employerId}?api_key=kewilah`;
        const response = await fetch(url);
        if (response.ok) 
        {
            const data = await response.json();
            console.log(data);
                
        }
    }
    catch (error)
    {
        console.log(error)
    }
}

// 3 post employer
const addEmployer = async function (employer)
{
    try 
    {
        const url = `http://167.71.45.243:4000/api/employes?api_key=kewilah`;
        const bodyRequest = {
                                nom: employer.nom, 
                                prenom: employer.prenom,
                                estMarie: employer.estMarie, 
                                pays: employer.pays, 
                                email: employer.email, 
                                poste: employer.poste, 
                                numeroTelephone: employer.numeroTelephone
                            }
        const response = await fetch(url, 
        {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });
        if (response.ok) 
        {
            const data = await response.json();
            // console.log(data);
            getEmployers();
        }   
    } 
    catch (error) 
    {
        console.log(error);
            
    }
}

// 4 update employer
const updateEmployer = async function (employerId, employerNewInfos)
{
    try 
    {
        const url = `http://167.71.45.243:4000/api/employes/${employerId}?api_key=kewilah`;
        const bodyRequest = {
            nom: employerNewInfos.nom, 
            prenom: employerNewInfos.prenom,
            estMarie: employerNewInfos.estMarie, 
            pays: employerNewInfos.pays, 
            email: employerNewInfos.email, 
            poste: employerNewInfos.poste, 
            numeroTelephone: employerNewInfos.numeroTelephone
        }
        const response = await fetch(url, 
            {
                method: "PUT",
                headers: 
                {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyRequest)
            });
            if (response.ok) 
            {
                const data = await response.json();
                getEmployers();
                console.log(data);
            }   
    } 
    catch (error) 
    {
        console.log(error);
            
    }
}
// 5 delete employer
const deleteEmployer = async function (employerId)
{
    try 
    {
        const url = `http://167.71.45.243:4000/api/employes/${employerId}?api_key=kewilah`;
        const response = await fetch(url, {method: "DELETE"});
        if (response.ok) 
        {
            const data = await response.json();
            // console.log(data);
            getEmployers()
        }  
    } 
    catch (error) 
    {
        console.log(error);
            
    }
}

// le formulaire d'ajout employer

formulaire.addEventListener("submit", function (e) 
{
    // les verification des champs
    for (champ of this.elements)
    {
        if (champ.name != "ajouter" && champ.name != "anuler") 
        {
            // Pour le champs nom et prenom du formulaire
            if (champ.name == "nom" || champ.name == "prenom") 
            {
                if (champ.value.length > 2) 
                {
                    if (champ.value.length < 50) 
                    {
                        employerInfos[`${champ.name}`] = champ.value; 
                    }
                    else
                    {
                        messageErreur.innerHTML = `<p> Le ${champ.name} inserer est trop long </p>`;
                        employerInfos = {};
                        break;
                    }  
                }
                else
                {
                    messageErreur.innerHTML = `<p> Le ${champ.name} inserer est trop court </p>`;
                    employerInfos = {}
                    break;
                }
            }
            // Pour le champ numero de telephone
            else if (champ.name == "telephone") 
            {
                if (champ.value.startsWith("243") && champ.value != "")
                {
                    employerInfos.numeroTelephone = champ.value;    
                }
                else
                {
                    messageErreur.innerHTML = `Le numero de telephone doit commencer par l'indicatif télephonique 243`;
                    employerInfos = {};
                    break;
                }
            }
            // pour les champs statut poste et estMarie
            else if (champ.name == "statut" || champ.name == "poste" || champ.name == "pays")
            {
                if (champ.value != "") 
                {
                    if (champ.name == "statut") 
                    {
                        if (champ.value == "Celibataire") 
                        {
                           employerInfos.estMarie = false;
                        }  
                        else
                        {
                           employerInfos.estMarie = true; 
                        }
                    }
                    else
                    {
                        employerInfos[`${champ.name}`] = champ.value;
                    }
                }
                else
                {
                    messageErreur.innerHTML = `Le champ ${champ.name} ne peut pas etre vide`;
                    employerInfos = {};
                    break;
                }   
            }
            else
            {
               employerInfos[`${champ.name}`] = champ.value;
            }
        }
    }
    const tailleEmployerInfos = tailleObjet(employerInfos);
    if (tailleEmployerInfos) 
    {
        if (employerInfos._id == "")
        {
            addEmployer(employerInfos);
        }
        else
        {
            updateEmployer(employerInfos._id, employerInfos);
        }
        
        console.log("formulaire envoyer");
        formulaire.reset();
        blockFormulaire.style.display = "none";
        tableauEmployers.style.display = "block";
        btnAjouter.style.display = "block";
    }
    e.preventDefault();    
})








