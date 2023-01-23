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

const popupPanier = (name) => {
  if (
    window.confirm(
      `Vous avez réservé ${document.getElementById("quantity").value} ${name} ${
        document.getElementById("colors").value
      } Pour consulter votre panier, cliquez sur OK`
    )
  ) {
    window.location.href = "cart.html";
  }
};

function gestionPanier(id, name) {
  let productLocalStorage = localStorage.getItem("kanapBasket");
  let objJson = JSON.parse(productLocalStorage);

  document.getElementById("addToCart").addEventListener("click", () => {
    if (
      document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <= 100 &&
      document.getElementById("colors").value != ""
    ) {

      let article = {
        id: id,
        quantity: document.getElementById("quantity").value,
        colors: document.getElementById("colors").value,
      };

      if (objJson) {
        console.log("Panier contenant du contenu, je verrifie");

      const articlePresent = objJson.find(
          (panier) => panier.id === article.id && panier.colors === article.colors
        );

        if (articlePresent) {
          console.log(
            "Produit trouvé, donc je n'ajoute pas, j'ajuste la quantité"
          );
          articlePresent.quantity =
            parseInt(article.quantity) + parseInt(articlePresent.quantity);
          localStorage.setItem("kanapBasket", JSON.stringify(objJson));
          popupPanier(name);
        } else {
          console.log("Produit non trouvé, donc j'ajoute");
          objJson.push(article);
          localStorage.setItem("kanapBasket", JSON.stringify(objJson));
          popupPanier(name);
        }
      } else {
        console.log("Panier vide, donc j'ajoute");
        objJson = [];
        objJson.push(article);
        localStorage.setItem("kanapBasket", JSON.stringify(objJson));
        popupPanier(name);
      }
      console.log(objJson);
      console.log(localStorage);
    } 
    
    else {
      alert("Vous devez renseigner le nombre d'articles et la couleur.");
    }
  });
}

