function getOrderId() {
  const orderId = document.getElementById("orderId");
  orderId.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
  }
  
  getOrderId();