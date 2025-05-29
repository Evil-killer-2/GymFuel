// Toggle search bar visibility
document.getElementById("searchIcon").addEventListener("click", function (e) {
  e.preventDefault();
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.toggle("active");
  
  // Focus on search input when visible
  if (searchBar.classList.contains("active")) {
    document.getElementById("searchInput").focus();
  }
});

// Close search when clicking outside
document.addEventListener("click", function(e) {
  const searchBar = document.getElementById("searchBar");
  const searchIcon = document.getElementById("searchIcon");
  
  if (!searchBar.contains(e.target) && e.target !== searchIcon) {
    searchBar.classList.remove("active");
  }
});

// Sample products for search
const products = [
  "Whey Protein",
  "Pre-Workout Extreme",
  "Creatine Monohydrate",
  "BCAA 2:1:1",
  "Mass Gainer",
  "Plant Protein",
  "Casein Protein",
  "Multivitamin",
  "Fat Burner",
  "Protein Bars",
  "Glutamine",
  "Testosterone Booster"
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Real-time product search
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  searchResults.innerHTML = "";
  
  if (query !== "") {
    const filtered = products.filter((product) =>
      product.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
      filtered.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item;
        div.addEventListener("click", function() {
          // Redirect to product page when clicked
          window.location.href = `products.html?search=${encodeURIComponent(item)}`;
        });
        searchResults.appendChild(div);
      });
    } else {
      searchResults.innerHTML = "<div class='p-3 text-muted'>No supplements found.</div>";
    }
    
    // Show results container
    searchResults.style.display = "block";
  } else {
    // Hide results container when empty
    searchResults.style.display = "none";
  }
});

// Close search results when clicking outside
document.addEventListener("click", function(e) {
  if (!searchBar.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Category card click handler
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", function() {
    const category = this.querySelector("span").textContent;
    window.location.href = `category.html?cat=${encodeURIComponent(category.toLowerCase())}`;
  });
});

// Quantity controls for product detail page
if (document.getElementById("quantityInput")) {
  document.getElementById("increaseQty").addEventListener("click", function() {
    const input = document.getElementById("quantityInput");
    input.value = parseInt(input.value) + 1;
  });
  
  document.getElementById("decreaseQty").addEventListener("click", function() {
    const input = document.getElementById("quantityInput");
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  });
}

// WhatsApp order button functionality
if (document.getElementById("whatsappOrder")) {
  document.getElementById("whatsappOrder").addEventListener("click", function() {
    const productName = document.querySelector(".product-detail-section h1").textContent;
    const quantity = document.getElementById("quantityInput").value;
    const price = document.querySelector(".price").textContent;
    const flavor = document.querySelector(".form-select").value;
    
    const message = `Hi GymFuel,\n\nI'd like to order:\n\n*Product:* ${productName}\n*Flavor:* ${flavor}\n*Quantity:* ${quantity}\n*Price:* ${price}\n\nPlease confirm availability and payment details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918791935796?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  });
}

// Initialize carousel with interval
if (document.getElementById("heroCarousel")) {
  const carousel = new bootstrap.Carousel(document.getElementById("heroCarousel"), {
    interval: 5000,
    pause: "hover"
  });
}

// Add to cart functionality
document.querySelectorAll(".btn-primary").forEach(btn => {
  if (btn.textContent.includes("Add to Cart")) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector(".card-title").textContent;
      const productPrice = productCard.querySelector(".price").textContent;
      
      // In a real app, you would add to cart storage here
      alert(`${productName} added to cart!\nPrice: ${productPrice}`);
      
      // Animation
      this.innerHTML = '<i class="fas fa-check me-2"></i>Added';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Add to Cart';
      }, 2000);
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});