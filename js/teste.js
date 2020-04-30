const requete = (method, url) => {
    const maRequete = new XMLHttpRequest();
    maRequete.open(method, url);
    maRequete.onload = () => {
      let data = JSON.parse(maRequete.responseText);
    }
    
    maRequete.send(); 
  };
  
  mesDonnees = () => {
    requete("GET", "http://167.71.45.243:4000/api/employes?api_key=kewilah");
    for (d of data) {
      let a = document.createElement("tr");
      a.innerHTML = `
              <th>${d.nom}</th>
              <th>${d.prenom}</th>
              <th>${d.email}</th>
              <th>${d._id}</th>
              <th>${d.poste}</th>
              <th>${d.estMarie == true ? "Marié(e)" : "Celibataire"}
              <th>${d.pays}</th>`;
      document.querySelector("tbody").append(a);
    }
  };
  

    
  
  // for (d of data)
  //      {
  //          let a = document.createElement("tr")
  //         for(e in d)
  //         {
  //             if(d[e] !== "kewilah" && d[e] !== 0)
  //             {
  //                 let o = document.createElement("th");
  //                 o.textContent= d[e];
  //                 a.appendChild(o);
  //             }
  //             console.log("rien");
  //         }
  //         document.querySelector("tbody").appendChild(a);
  //      }






 
  const employers = document.querySelectorAll("tbody th");
  const suprimer = document.querySelector("#suprimer");
  const modifier = document.querySelector("#modifier");
  for (employer of employers) 
  {
      employer.addEventListener("click", e => {
      modale1.style.display = "flex";


        suprimer.addEventListener("click", e => {
        // document.querySelector("tbody").remove(employer.parentNode);
        console.log(employer);
        
        modale1.style.display = "none";
        });


        modifier.addEventListener("click", e => {
        let a = employer.parentNode.childNodes;
        for (let j = 0; j < a.length; j++) {
          form.elements[j].value = a[j].textContent;
        }
        cacher(modale1, formAjouter);
        btnanuler.textContent = "Supprimer";
        btnAjouter.style.display = "none";
        document.querySelector("tbody").remove(employer.parentNode);
      });


      btnanuler.textContent = "Anuler";
    });
}


for (l in user)
        {
          let champs = document.createElement("th");
          champs.textContent = user[l];
          a.append(champs);
        }
        document.querySelector("tbody").append(a);







         // a.addEventListener("click", () => { 
        //   modale1.style.display = "flex";
          
        //   supprimer.addEventListener("click", () => {
        //     // console.log(user);
            
        //     deleteUser(user);
        //   })
        // })