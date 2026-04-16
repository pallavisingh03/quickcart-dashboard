
let allProducts = [];
let cartCount = 0;

async function fetchProducts() {
  try {
    console.log("Fetching data...");

    const res = await fetch("https://fakestoreapi.com/products");
    console.log("Response:", res);

    const data = await res.json();
    console.log("Data:", data);

    allProducts = data;
    renderProducts(data);
    loadCategories(data);

  } catch (error) {
    console.log("ERROR:", error);
    document.getElementById("products").innerHTML = "Error loading products";
  }
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100 shadow-sm border-0">
      <img src="${p.image}" class="card-img-top p-3" style="height:200px; object-fit:contain;">
      
      <div class="card-body d-flex flex-column">
        <h6 class="card-title">${p.title.substring(0, 40)}...</h6>
        <p class="text-muted">${p.category}</p>
        
        <h5 class="text-primary">$${p.price}</h5>

        <button onclick="addToCart()" class="btn btn-dark mt-auto">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
`;
  });
}
      
  
    
  


function loadCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];

  const select = document.getElementById("category");

  categories.forEach(c => {
    select.innerHTML += `<option value="${c}">${c}</option>`;
  });
}
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});
function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}
fetchProducts();
console.log("fetching data");


 