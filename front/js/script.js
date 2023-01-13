url = "http://localhost:3000/api/products";

 function accueil(url) {
   fetch(url)
     .then(function (response) {
       if (response.ok) {
         return response.json();
       }
     })
     .then(function (articles) {
       for (let article of articles) {
         addItem(
           article._id,
           article.imageUrl,
           article.altTxt,
           article.name,
           article.description,
         );
       }
     })
     .catch((error) => {
        console.error('Error:', error);
    })
 }
 accueil(url);

 function addItem(idItem, imageUrl, imageAlt, name, description) {
    var items = document.getElementById("items");
  
    let linkItem = document.createElement("a");
    linkItem.href = "product.html?id=" + idItem;
    items.append(linkItem);
  
    let articleItem = document.createElement("article");
    linkItem.append(articleItem);
  
    let imageItem = document.createElement("img");
    imageItem.src = imageUrl;
    imageItem.alt = imageAlt;
    articleItem.append(imageItem);
  
    let titleItem = document.createElement("h3");
    titleItem.textContent = name;
    titleItem.classList.add("productName");
    articleItem.append(titleItem);
  
    let descriptionItem = document.createElement("p");
    descriptionItem.textContent = description;
    descriptionItem.classList.add("productDescription");
    articleItem.append(descriptionItem);
  }
 