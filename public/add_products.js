$(function () {
    let productName = $('#productName')
    let productPrice = $('#productPrice')
    let venderId = $('#venderId')
    let productQty = $('#productQty')
    let productList = $('#product-list')

    /*
    *   get all the venders from vendor table and append the retrived data in the list
    */
    fetchVenders(function (venders) {
        venderId.empty()
        for (vender of venders) {
            venderId.append(appendVenderOptions(vender))
        }
    })

    /*
    *   get all the products from product table and append the retrived data in the list
    */
    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(appendProduct(product))
        }
    })
    productName.focus();
    
    /*
    *   add the products details to the product table on button click and get all the products
    *   from product table
    */
    $('#btnProductAdd').click(function () {
        addProduct(productName.val(),
            productPrice.val(),
            venderId.val(),
            productQty.val(),
            function (addedProduct) {
                //window.alert(addedProduct.name + " Added to your Shop.")
                console.log(addedProduct.name + " Added to your Shop.")
            })
        $('#form1 input').val('');//empty the textbox after submition
        productName.focus();
        fetchProducts(function (products) {
            productList.empty()
            for (product of products) {
                productList.append(appendProduct(product))
            }
        })
    })
})

/*
*   delete the product by its associated delete button and update the product list
*/
$(document).on("click", "#product-table tbody tr td button.delProduct", function () {
    var productId = this.id
    let productList = $('#product-list')
    deleteProduct(productId)
    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(appendProduct(product))
        }
    })
});