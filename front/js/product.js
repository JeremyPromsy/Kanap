let url = window.location.href;
let urlObject = new URL(url);
let id = urlObject.searchParams.get("id");
//console.log(id);

urlProduct = "http://localhost:3000/api/products/" + id;

function produit(urlProduct) {
    fetch(urlProduct)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (article) {
        produitPage(
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
produit(urlProduct);

  
function produitPage(imageUrl, imageAlt, name, price, description, colors) {
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
    for (let options of colors) {
        let optionColor = document.createElement("option");
        optionColor.textContent = options;
        colorChoice.append(optionColor);
    }
}


// début de l'ajout au panier 
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  btn_envoyerPanier.addEventListener("click", (envoie)=>{
      if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

  let choixCouleur = colorPicked.value;
              
  let choixQuantite = quantityPicked.value;

  //options a recupérer 
  let optionsProduct = {
      idProduit: idProduct,
      couleurProduit: choixCouleur,
      quantiteProduit: Number(choixQuantite),
      nomProduit: article.name,
      prixProduit: article.price,
      descriptionProduit: article.description,
      imgProduit: article.imageUrl,
      altImgProduit: article.imageAlt
  };

// local storage
let productLocalStorage = localStorage.getItem("produit");
let objJson = JSON.parse(productLocalStorage);


          }
      }
)}