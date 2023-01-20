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

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

function addToCart(article) {
  // local storage
  let productLocalStorage = localStorage.getItem("produit");
  let objJson = JSON.parse(productLocalStorage);
  
  
  const btn_envoyerPanier = document.querySelector("#addToCart");

  btn_envoyerPanier.addEventListener("click", ()=>{
      if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){
  let choixCouleur = colorPicked.value;        
  let choixQuantite = quantityPicked.value;

  //fenêtre pop-up
  const popupConfirmation =() =>{
    if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
        window.location.href ="cart.html";
    }
  }

//Importation dans le local storage
  //Si le panier comporte déjà au moins 1 article
  if (objJson) {
    const resultFind = objJson.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduct.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(objJson));
            console.table(objJson);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
          objJson.push(optionsProduct);
            localStorage.setItem("produit", JSON.stringify(objJson));
            console.table(objJson);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
      objJson =[];
      objJson.push(optionsProduct);
        localStorage.setItem("produit", JSON.stringify(objJson));
        console.table(objJson);
        popupConfirmation();
      }}
    });
}
