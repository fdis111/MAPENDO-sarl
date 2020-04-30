// les variables 

const btnAjouter = document.querySelector("#Ajouter");
const formAjouter = document.querySelector("#formulaire");
const btnanuler = document.querySelector("#anuler");
const form = document.querySelector("form");
const modale1 = document.querySelector("#modale");
const quiter = document.querySelector("#quiter");
const supprimer = document.querySelector("#suprimer");
const modifier = document.querySelector("#modifier");
let infos =  {};






btnAjouter.addEventListener("click", e => {
  form.elements.ajouter.value = "Ajouter";
  cacher(btnAjouter, formAjouter);
  form.reset();
});


btnanuler.addEventListener("click", e => {
  cacher(formAjouter, btnAjouter);
  form.reset();
})







// Fonctions

const cacher = (obj1, obj2) => {
  obj1.style.display = "none";
  obj2.style.display = "block";
}


const addToListe = element => {
  let a = document.createElement("tr");
  
  a.innerHTML = `
          <td>${element.nom}</td>
          <td>${element.prenom}</td>
          <td>${element.email}</td>
          <td>${element._id}</td>
          <td>${element.poste}</td>
          <td>${element.numeroTelephone ? user.numeroTelephone : ""}</td>
          <td>${element.estMarie == true ? "Marié(e)" : "Celibataire"}</td>
          <td>${element.pays}</td>`;

  document.querySelector("tbody").append(a);  
  a.addEventListener("click", () => {
    console.log("Ok");
    modale1.style.display = "flex";
    supprimer.addEventListener("click", () => {
      // deleteUser(element);
      console.log(element);
      element = {}
      getOne(element._id)
      modale1.style.display = "none";
    })
    modifier.addEventListener("click", () => {
      // console.log(element);
      form.elements.nom.value = element.nom;
      form.elements.prenom.value = element.prenom;
      form.elements.email.value = element.email;
      form.elements.poste.value = element.poste;
      form.elements.telephone.value = element.numeroTelephone;
      // form.elements.statut.value = element.estMarie == true ? "Marié(e)" : "Celibataire";
      form.elements.pays.value = element.pays;
      form.elements._id.value = element._id;
      form.elements.ajouter.value = "Modifier";
      formAjouter.style.display = "block"
      modale1.style.display = "none";


      // element = {};
    })
    
  })

}


const deleteUser = async (user) => {
  try 
  {
    const url = `http://167.71.45.243:4000/api/employes/${user._id}?api_key=kewilah`;
    const response = await fetch(url, {
    method: "DELETE",
    });
    if(response.ok)
    {
      const data = await response.json();
      getUsers();  
      console.log("nous avons supprimer " + user.nom );
      
    }
    else
    {
      console.log(`Nous avons rencotrer une erreure de type: ${response.status}`);
    
    }  
  } 
  catch (e) 
  {
    console.log(e);
    
  }

}




// supprimer.addEventListener("click", () => {
//   // deleteUser(element);
//   // console.log(element);
  
//   getOne(element._id);

  
  
//   modale1.style.display = "none";
// })





const getUsers = async () =>{
 document.querySelector("tbody").innerHTML = "";
 try {
  const response = await fetch("http://167.71.45.243:4000/api/employes?api_key=kewilah");
  if(response.ok)
  {
    const data = await response.json();
      for (user of data)
      {

        addToListe(user)  

      }
     
  }
  else
  {
    console.log(`Nous avons rencotrer une erreure de type: ${response.status}`);
  }
 } catch (e) 
 {
  console.log(e);  
 }
}


const getOne = async (userId) => {
  document.querySelector("tbody").innerHTML = "";
  const url = `http://167.71.45.243:4000/api/employes/${userId}?api_key=kewilah`;
  try
  {
    const response = await fetch(url);
    if (response.ok) 
    {
      const data = await response.json();
      console.log(data);
      getUsers()
      // deleteUser(data)
    }
  }
  catch (e)
  {
    console.log(e);
    
  }
}






const postUser = async (infos) => {
  const body = { nom: infos.nom, prenom: infos.prenom, estMarie: infos.estMarie, pays: infos.pays, email: infos.email, poste: infos.poste, numeroTelephone: infos.numeroTelephone};
  const url = `http://167.71.45.243:4000/api/employes?api_key=kewilah`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(response.ok)
    {
      const data = await response.json();
      getUsers();
      
    }
    else
    {
      console.log(`Nous avons rencotrer une erreure de type: ${response.status}`);
      
    }
   } catch (e) 
   {
    console.error(e);  
   }
}


const updateUser = async (userData) => {
  const body = { nom: userData.nom, prenom: userData.prenom, estMarie: userData.estMarie, pays: userData.pays, email: userData.email, poste: userData.poste, numeroTelephone: userData.numeroTelephone};
  const url = `http://167.71.45.243:4000/api/employes/${userData._id}?api_key=kewilah`;
  try 
  {
    const response = await fetch(url, {
      method: "PUT",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(response.ok)
    {
      // const data = await response.json();
      getUsers();  

    }  
    else
    {
      console.log(`Nous avons rencotrer une erreure de type: ${response.status}`);
    }
  } 
  catch 
  (e)
  {
    console.error(e);
    
  }
}

getUsers()

form.addEventListener("submit", e => {
  let tr = document.createElement("tr");
  
  for (ele of form.elements) {
    if (ele.name != "ajouter" && ele.name != "anuler") {
      if (ele.name == "nom" || ele.name == "prenom") 
      {
        if (ele.value.length > 2) 
        {
          if (ele.value.length < 50) 
          {
             let entre = document.createElement("th");
             entre.textContent = ele.value;
             infos[`${ele.name}`] = ele.value;
             tr.append(entre);
          }
          else
          {
            document.querySelector("#erreur").innerHTML = `<p> Le ${ele.name} inserer est trop long </p>`;
            tr.innerHTML = "";
            break;
          }
        }
        else
        {
            document.querySelector("#erreur").innerHTML = `<p> Le ${ele.name} inserer est trop court </p>`;
            tr.innerHTML = "";
            break;
        }
      } 
      else if(ele.name == "telephone")
      {
        if (ele.value.startsWith("243") && ele.value != "") 
        {
          let entre = document.createElement("th");
          entre.textContent = ele.value;
          infos.numeroTelephone = ele.value;
          tr.append(entre);
        }
        else
        {
          document.querySelector("#erreur").innerHTML = `Votre numero n'est pas valide`;
          tr.innerHTML = "";
          break;
        }
      }
      else if (ele.name == "statut" || ele.name == "poste" || ele.name == "pays")
      {
        if (ele.value != "") 
        {
          if (ele.name == "statut") 
          {
              if (ele.value == "Celibataire") 
              {
                infos.estMarie = false;
              }  
              else
              {
                infos.estMarie = true; 
              }
          }
          else
          {
            let entre = document.createElement("th");
            entre.textContent = ele.value;
            infos[`${ele.name}`] = ele.value;
            tr.append(entre);  
          }
            
        }
        else
        {
          document.querySelector("#erreur").innerHTML = `Veullez entrer un ${ele.name}`;
          tr.innerHTML = "";
          break;
        }
      }
      else 
      {
        let entre = document.createElement("th");
        entre.textContent = ele.value;
        infos[`${ele.name}`] = ele.value;
        document.querySelector("#erreur").innerHTML = "";
        tr.append(entre);
      }
    }
  }
  if (tr.childElementCount) {
    if (form.elements.ajouter.value === "Modifier") {
      // console.log("ca Commence a marcher");
      // console.log(infos);
      updateUser(infos);
      infos = {};
    }
    else
    {
      // console.log("ca ne marche pas");
      // console.log(infos);
      postUser(infos);
    }
    cacher(formAjouter, btnAjouter)
    form.reset();
  }

  e.preventDefault();
});
quiter.addEventListener("click", e => {
  modale1.style.display = "none";
});
