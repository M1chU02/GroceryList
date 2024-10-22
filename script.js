// Function to add a grocery item
function addGrocery() {
  const groceryInput = document.getElementById("groceryInput");
  const groceryList = document.getElementById("groceryList");

  const groceryValue = groceryInput.value.trim();

  if (groceryValue === "") {
    alert("Please enter a grocery item!");
    return;
  }

  // Create a new list item
  const listItem = document.createElement("li");

  listItem.innerHTML = `
        <span>${groceryValue}</span>
        <div>
            <button class="bought" onclick="markAsBought(this)">Bought</button>
            <button class="delete" onclick="deleteItem(this)">Delete</button>
        </div>`;

  groceryList.appendChild(listItem);
  groceryInput.value = ""; // Clear input
  saveToLocalStorage();
}

// Function to mark an item as bought
function markAsBought(button) {
  const listItem = button.parentElement.parentElement;
  listItem.classList.toggle("bought");
  saveToLocalStorage();
}

// Function to delete an item
function deleteItem(button) {
  const listItem = button.parentElement.parentElement;
  listItem.remove();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const groceryList = document.getElementById("groceryList");
  const items = Array.from(groceryList.children).map((item) => ({
    text: item.querySelector("span").textContent,
    bought: item.classList.contains("bought"),
  }));
  localStorage.setItem("groceryItems", JSON.stringify(items));
}

function clearList() {
  const groceryList = document.getElementById("groceryList");
  groceryList.innerHTML = "";
  localStorage.removeItem("groceryItems");
}

function loadFromLocalStorage() {
  const groceryList = document.getElementById("groceryList");
  const savedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];

  savedItems.forEach((item) => {
    const listItem = document.createElement("li");
    if (item.bought) listItem.classList.add("bought");

    listItem.innerHTML = `
      <span>${item.text}
      <div>
        <button class="bought" onclick="markAsBought(this)">Bought</button>
        <button class="delete" onclick="deleteItem(this)">Delete</button>
      </div>`;

    groceryList.appendChild(listItem);
  });
}

// Load items from local storage when the page loads
window.addEventListener("load", loadFromLocalStorage);
