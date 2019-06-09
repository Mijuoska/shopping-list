let shoppingList = []

// sort products by price

const sortItemsByPrice = function (list) {
    list.sort(function (a, b) {
        if (a.price > b.price) {
            return -1
        } else if (b.price > a.price) {
            return 1
        } else {
            return 0
        }
    })
}

const renderList = function () {
    sortItemsByPrice(shoppingList)
    shoppingList.forEach(function (item) {
        listItem = document.createElement("li")
        listItem.textContent = `${item.item} ${item.price} €`
        listItem.id = `${item.item}`
        document.querySelector("#shopping-list").appendChild(listItem)
    })

};

shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
sortItemsByPrice(shoppingList)
renderList()

// add a product
const addItem = function (item, price) {
    shoppingList.push({item: item, price: price})
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

document.querySelector("#item-name").addEventListener("input", function (e) {
    itemInput = e.target.value
});
 
document.querySelector("#item-price").addEventListener("input", function (e) {
    priceInput = Number(e.target.value)
});


document.querySelector("#add-item").addEventListener("click", function () {
    addItem(itemInput, priceInput)
});

shoppingList.forEach(function (item) {
    document.querySelector(`#${item.item}`).addEventListener("click", function (){
        deleteItem(item.item)
    });
});



// delete an item
const deleteItem = function (itemName) {
    const index = shoppingList.findIndex(function (item) {
        return item.item.toLowerCase() === itemName.toLowerCase()
    })
    if (index > -1) {
        shoppingList.splice(index, 1)
        document.querySelector(`#${itemName}`).remove()
    } 
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}








