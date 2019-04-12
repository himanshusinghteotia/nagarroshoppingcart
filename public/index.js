/*
*   get all the products from product table and append the retrived data in the list
*   after login check
*/
$(function () {
    let userName = localStorage.getItem("name");
    if (userName == null) {
        $('#logOut').hide()
        $('#cart').hide()
    }
    else {
        $('#logOut').show()
        $('#cart').show()
        $('#btnUserAdd').hide()
        let productList = $('#product-list')
        fetchProducts(function (products) {
            productList.empty()
            for (product of products) {
                productList.append(createProductCard(product))
            }
        })
    }
})

/*
*   add the user into the user table on add user button click and then load all products
*/
$(document).on("click", "#btnUserAdd", function () {
    let userName = $('#userName')
    addUser(userName.val(),
        function (addedUser) {
            //window.alert(addedProduct.name + " Added to your Shop.")
            console.log(addedUser[0].name + " Added to your Shop.")
            localStorage.setItem("name", addedUser[0].name)
            localStorage.setItem("id", addedUser[0].id)
        })
    $('#form1 input').val('');
    userName.focus();
    let productList = $('#product-list')
    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(createProductCard(product))
        }
    })
    if (userName == null) {
        $('#logOut').hide()
        $('#cart').hide()
    }
    else {
        $('#logOut').show()
        $('#cart').show()
        $('#btnUserAdd').hide()
    }
});

/*
*   get the user logout
*/
$(document).on("click", "#logOut", function () {
    localStorage.removeItem("name")
    localStorage.removeItem("id")
    location.reload()
})

/*
*   add the product to the user's cart on button click
*/
$(document).on("click", ".productId", function () {
    let userId = localStorage.getItem("id");
    addToCart(this.id,
        userId,
        function (addedProduct) {
            console.log("Product with id " + addedProduct.productId + " Added to your cart.")
        })
})