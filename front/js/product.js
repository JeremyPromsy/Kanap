let url = window.location.href;
let urlObject = new URL(url);
let id = urlObject.searchParams.get("id");
//console.log(id);

urlProduct = "http://localhost:3000/api/products/" + id;

function getProduit(urlProduct) {
    fetch(urlProduct)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (article) {
        getProduitPage(
          article.imageUrl,
          article.altTxt,
          article.name,
          article.price,
          article.description,
          article.colors
        );
        gestionPanier(id, article.name);
      })
      .catch((error) => {
        console.error('Error:', error);
    })
  }
getProduit(urlProduct);

  
function getProduitPage(imageUrl, imageAlt, name, price, description, colors) {
    //nom de la page
    document.title = name;

    //image + Alt
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = imageUrl;
    productImg.alt = imageAlt;
  
    //Nom du Kanap
    document.getElementById("title").textContent = name;

    // Prix
    document.getElementById("price").textContent = price;

    // Description
    document.getElementById("description").textContent = description;

    // Couleurs 
    let colorChoice = document.getElementById("colors");

    // Création fonction couleurs
    for (let option of colors) {
        let optionColor = document.createElement("option");
        optionColor.textContent = option;
        colorChoice.append(optionColor);
    }
}

// Confirmation mise au panier
const fenetrePanier = (name) => {
  if (
    window.confirm(
      `Vous avez acheté ${document.getElementById("quantity").value} ${name} de couleur ${
        document.getElementById("colors").value
      } 
      Pour aller au panier, cliquez sur OK`
    )
  ) {
    window.location.href = "cart.html";
  }
};

function gestionPanier(id, name) {
  // local Storage
  let productLocalStorage = localStorage.getItem("panier");
  let objJson = JSON.parse(productLocalStorage);

  // mise au panier au clic : quantité + couleurs
  document.getElementById("addToCart").addEventListener("click", () => {
    let article = {
      id: id,
      quantity: document.getElementById("quantity").value,
      colors: document.getElementById("colors").value,
    };
    
    if (
      document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <= 100 &&
      document.getElementById("colors").value != ""
    ) {

      // Tout est ok 
      if (objJson) {
      const articleOk = objJson.find(
          (panier) => panier.id === article.id && article.colors && article.colors
        );

        // Produit ok - Quantité non 
        if (articleOk) {
          articleOk.quantity = parseInt(article.quantity) + parseInt(articleOk.quantity);
          localStorage.setItem("panier", JSON.stringify(objJson));
          fenetrePanier(name);
        } 

        // Produit non - Quantité non 
        else {
          objJson.push(article);
          localStorage.setItem("panier", JSON.stringify(objJson));
          fenetrePanier(name);
        }
      } 
      
        // Panier vide 
        else {
          objJson = [];
          objJson.push(article);
          localStorage.setItem("panier", JSON.stringify(objJson));
          fenetrePanier(name);
        }
      } 

      // Rien sélectionné
      else {
       alert();
      }
  });
}

