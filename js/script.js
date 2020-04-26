// les variables 

const btnAjouter = document.querySelector("#Ajouter");
const formAjouter = document.querySelector("#formulaire");
const btnanuler = document.querySelector("#anuler");
const form = document.querySelector("form");
const modale1 = document.querySelector("#modale");
const quiter = document.querySelector("#quiter");


const cacher = (obj1, obj2) => {
  obj1.style.display = "none";
  obj2.style.display = "block";
}


btnAjouter.addEventListener("click", e => {
  cacher(btnAjouter, formAjouter);
  form.reset();
});


btnanuler.addEventListener("click", e => {
  cacher(formAjouter, btnAjouter);
  form.reset();
})
const users = async () =>{
 try {
  const response = await fetch("http://167.71.45.243:4000/api/employes?api_key=kewilah");
  if(response.ok)
  {
    const data = await response.json();
      for (user of data)
      {
        let a = document.createElement("tr");
        a.innerHTML = `
                <th>${user.nom}</th>
                <th>${user.prenom}</th>
                <th>${user.email}</th>
                <th>${user._id}</th>
                <th>${user.poste}</th>
                <th>${user.numeroTelephone ? user.numeroTelephone : ""}
                <th>${user.estMarie == true ? "Marié(e)" : "Celibataire"}
                <th>${user.pays}</th>`;
        document.querySelector("tbody").append(a);
      }
     
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


users()


form.addEventListener("submit", e => {
  let tr = document.createElement("tr");
  let infos =  {};
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
    // document.querySelector("tbody").append(tr);
    // console.log(infos);
    const postUser = async (infos) => {
      try {
        const response = await fetch("http://167.71.45.243:4000/api/employes?api_key=kewilah", {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(infos)
        });

        if(response.ok)
        {
          const data = await response.json();
          users();
          
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
    postUser(infos)
    cacher(formAjouter, btnAjouter)
    form.reset();
    
  }
  e.preventDefault();
});
quiter.addEventListener("click", e => {
  modale1.style.display = "none";
});
