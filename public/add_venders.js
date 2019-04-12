$(function () {
    let venderName = $('#venderName')
    let venderList = $('#vender-list')
    venderName.focus();
    /*
    *   get all the venders from vendor table and append the retrived data in the list
    */
    fetchVenders(function (venders) {
        venderList.empty()
        for (vender of venders) {
            venderList.append(appendVender(vender))
        }
    })
})

/*
*   add the vender details to the vender table on button click and get all the venders from vendor table
*/
$(document).on("click", "#btnVenderAdd", function () {
    let venderList = $('#vender-list')
    let venderName = $('#venderName')
    addVender(venderName.val(),
        function (addedVender) {
            console.log(addedVender.name + " Added to your Database.")
        })
    $('#form1 input').val('');//empty the textbox after submition
    venderName.focus();
    fetchVenders(function (venders) {
        venderList.empty()
        for (vender of venders) {
            venderList.append(appendVender(vender))
        }
    })
})
/*
*   delete the vender by its associated delete button and update the vender list
*/
$(document).on("click", "#vender-table tbody tr td button.delVender", function () {
    var venderId = this.id
    let venderList = $('#vender-list')
    deleteVender(venderId)
    fetchVenders(function (venders) {
        venderList.empty()
        for (vender of venders) {
            venderList.append(appendVender(vender))
        }
    })
});