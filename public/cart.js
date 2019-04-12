/*
*	get the cart items of the logged in user and append them to the cart list
*/
$(function () {
	let cartList = $('#cart-list')
	let userId = localStorage.getItem("id");	
	fetchCart(userId,function (cprods) {	
		cartList.empty()
		console.log(cprods)
		for (cprod of cprods) {
			cartList.append(appendCart(cprod))
		}
	})

	/*
	$('#product-list').on('click', 'button', function () {
		var c = this.id
		var a = document.querySelectorAll("div[id=div1]")
		var productName = a[c - 1].childNodes[1].innerText
		var productPrice = a[c - 1].childNodes[5].childNodes[1].innerText
		addCart(
			parseInt(c),
			productName,
			productPrice,
			function (addedProduct) {
			}
		)
	})
	$('.add').on('click', 'button', function () {
		var btnId = this.id;
	})
	$('.sub').on('click', 'button', function () {
		var btnId = this.id;
	})
	*/
})