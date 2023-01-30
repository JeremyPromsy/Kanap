function getOrderId() {
    let actualUrl = document.location.href;
    actualUrl = new URL(actualUrl);
    let id = actualUrl.searchParams.get("id");
    document.getElementById("orderId").textContent = id;
  }
  
  getOrderId();