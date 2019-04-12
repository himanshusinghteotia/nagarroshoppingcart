/*
*   get request for all the venders in vendor table
*/
function fetchVenders(done) {
    $.get('/api/venders', function (data) {
        done(data)
    })
}

/*
*   post request to add vender in vendor table
*/
function addVender(name, done) {
    $.post('/api/venders', {
        name: name
    }, function (data) {
        done(data)
    })
}

/*
*   add venders to the vender list
*/
function appendVender(vender) {
    return $(`<tr>
                 <td>${vender.id}</td>
                 <td>${vender.name}</td>
                 <td><button class="delVender" id="${vender.id}">X</button></td>
                </tr>`
    )
}

/*
*   add vender to the vender dropdown
*/
function appendVenderOptions(vender) {
    return $(`<option value="${vender.id}">${vender.name}</option>`)
}

/*
*   delete request for the vender
*/
function deleteVender(id) {
    $.ajax({
        url: '/api/venders',
        method: 'DELETE',
        data: { id: id },
        success: function (result) {
            console.log(JSON.stringify(result))
        }
    });
}

/*
*   get request for the products from database
*/
function fetchProducts(done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}

/*
*   post request to add product in product table
*/
function addProduct(name, price, vender_id, quantity, done) {
    $.post('/api/products', {
        name: name,
        price: price,
        vender_id: vender_id,
        quantity: quantity
    }, function (data) {
        done(data)
    })
}
/*
*   add products to the product list
*/
function appendProduct(product) {
    return $(`<tr>
                 <td>${product.id}</td>
                 <td>${product.name}</td>
                 <td>${product.price}</td>
                 <td>${product.vender_id}</td>
                 <td>${product.quantity}</td>
                 <td><button class="delProduct" id="${product.id}">X</button></td>
                </tr>`
    )
}

/*
*   create product details card to display on shop home page 
*/
function createProductCard(product) {
    return $(`
    <div class="col-5 card mx-auto mb-4 p-4 text-center border-primary" id="div1">
        <!--<img height="150px"src="/images/${product.name}.jpg">-->
        Product Name<h4 class="product-name text-uppercase">${product.name}</h4>
        <div class="product-quantity v >Qty: ${product.quantity}</div>
        <div class="row">
            <div class="product_price col m-3 p-3">
                <b>₹${product.price}</b>
            </div>
            <button id="${product.id}"class="productId col-2 btn btn-primary m-auto" data-toggle="tooltip" data-placement="top" title="Add to Cart"><i class="fas fa-plus"></i></button>
        </div>
    </div>`
    )
}

/*
*   delete request for the product
*/
function deleteProduct(id) {
    $.ajax({
        url: '/api/products',
        method: 'DELETE',
        data: { id: id },
        success: function (result) {
            console.log(JSON.stringify(result))
        }
    });
}

/*
*   post request to add user in user table
*/
function addUser(name, done) {
    $.post('/api/users', {
        name: name
    }, function (data) {
        done(data)
    })
}

/*
*   get request for all the cart item of logged in user
*/
function fetchCart(userId, done) {
    $.get('/api/carts', { user_id: userId }, function (data) {
        done(data)
    })
}

/*
*   post request to add the cart item in cart table
*/
function addToCart(productId, userId, done) {
    $.post('/api/carts', {
        productId: productId,
        userId: userId
    }, function (data) {
        done(data)
    })
}

/*
*   add cart items in the cart list
*/
let total = 0;
function appendCart(cart) {
    x = parseInt(cart.qty) * parseFloat(cart.product.price)
    total = total + x;
    console.log(cart.qty)
    $('.total').text("Total: ₹ " + total);
    return $(`<tr>
                 <!--<td><img height="30px"src="/images/${cart.name}.jpg"></td>-->
                 <td class="item-name">${cart.product.name}</td>
				 <td class="item-number text-center"><button class="sub" id="${cart.Pid}">minus</button>${cart.qty}*${cart.product.price}<button class="add" id="${cart.Pid}">plus</button></td>
                 <td class="item-price">₹${x}</td>
                </tr>`
    )
}