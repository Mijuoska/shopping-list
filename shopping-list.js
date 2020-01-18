const shoppingList = []



const sortItemsByPrice = function (shoppingList, sortOrderA = -1, sortOrderB = 1) {
    shoppingList.sort(function (a, b) {
        if (a.price > b.price) {
            return sortOrderA
        } else if (b.price > a.price) {
            return sortOrderB
        } else {
            return 0
        }
    });
}


// sum up total price

const sumUpTotal = function () {
    let total = 0
    shoppingList.forEach(function (item) {
        total += item.price
    })
    return total
}

// render total

const renderTotal = function () {
    let total = document.querySelector("#total-price")
    total.innerHTML = `${sumUpTotal()} €`
}




// delete an item
const deleteItem = function (itemName) {
    const index = shoppingList.findIndex(function (item) {
        return item.name.toLowerCase() === itemName.toLowerCase()
    })
    if (index > -1) {
        shoppingList.splice(index, 1)
        document.querySelector(`#${itemName}`).remove()
        // We also need to calculate the total again and render it
        sumUpTotal()
        renderTotal()
    }
}

    


const renderList = function (sortOrderA, sortOrderB) {
    document.querySelector("#shopping-list").innerHTML = ""
    sortItemsByPrice(shoppingList, sortOrderA, sortOrderB)
    shoppingList.forEach(function (item) {
        listItem = document.createElement("li")
        listItem.id = `${item.name}`
        listItem.innerHTML = `<span class="item">${item.name}</span> <span class="price">${item.price} €</span></span>`
        document.querySelector("#shopping-list").appendChild(listItem)
        // we need to add "deletability to each item as they are createdS"
        document.getElementById(`${item.name}`).addEventListener("click", function () {
                deleteItem(item.name)
            });
        sumUpTotal()
        renderTotal()
    });

};




document.querySelector("#add-item-form").addEventListener("submit", function (e) {
    e.preventDefault()
    name = e.target.elements.itemName.value 
    price = Number(e.target.elements.itemPrice.value)
    if (name !== "" && price !== "") {
        shoppingList.push({ name: name, price: price })
        e.target.elements.itemName.value = ""
        e.target.elements.itemPrice.value = ""
    } else {
        alert("Please provide a value to both the name and price fields")
    }
    renderList()
});



sortOptions = document.getElementsByName("sort")
sortOptions.forEach(function (option) {
    option.addEventListener("change", function (e) {
    let sortOrder = e.target.value
    if (sortOrder === "desc") {
        sortOrderA = -1
        sortOrderB = 1
    } else if (sortOrder === "asc") {
        sortOrderA = 1
        sortOrderB = -1
    }
    renderList(sortOrderA, sortOrderB)
})

})














