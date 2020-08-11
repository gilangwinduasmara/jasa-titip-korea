const product = [
    {
        id: '1',
        title: 'tas',
        price: 'Rp 100.000'
    },
    {
        id: '2',
        title: 'tas lagi',
        price: 'Rp 100.000'
    },
    {
        id: '3',
        title: 'rok',
        price: 'Rp 100.000'
    },
    {
        id: '1',
        title: 'kosmetik',
        price: 'Rp 100.000'
    },
    {
        id: '2',
        title: 'skinker',
        price: 'Rp 100.000'
    },
    {
        id: '3',
        title: 'bedak',
        price: 'Rp 100.000'
    },
    {
        id: '1',
        title: 'holololo',
        price: 'Rp 100.000'
    },
    {
        id: '2',
        title: 'bakwan',
        price: 'Rp 100.000'
    },
    {
        id: '3',
        title: 'hihi',
        price: 'Rp 100.000'
    }
]

var carts = [
    {
        id: '1',
        title: 'Water Bank Serum',
        price: 500000,
        count: 1,
        cicil: false
    },
    {
        id: '1',
        title: 'Skincare',
        price: 100000,
        count: 2,
        cicil: false
    }
]

function tes(){
    alert("ok")
    var element = document.getElementById("login-modal");
    element.classList.toggle("modal");
}

function loadProduct(query=""){
    document.getElementById('product-list').innerHTML = ""
    console.log(query)
    var filteredItem = []
    filteredItem = product
    if(query != false){
        filteredItem = product.filter((item, index) => (item.title.indexOf(query) > -1))
    }

    var newItem = document.createElement("div", )
    var title = document.createTextNode("halo")
    newItem.appendChild(title)
    var h = "<div class='row'>"
    if(filteredItem.length == 0){
        h += `<p>Tidak menemukan hasil untuk <b style="margin-left: 4px">${query}</b></p>`
    }
    h+="<br>"
    for(var i=0; i<filteredItem.length; i++){
        h+="<div class='col-3'>"
            h+=`<div class='d-flex flex-column product-container justify-content-between'>`
                h+=`<img class='product-img'></img>`
                h+=`<div class='product-body'>`
                    h+=`<div class='product-title'>${filteredItem[i].title}</div>`
                    h+=`<div class='product-price'>${filteredItem[i].price}</div>`
                h+=`</div>`
            h+=`</div>`
        h+=`</div>`
    }
    h += "</div>"
    document.getElementById('product-list').insertAdjacentHTML("beforeend", h)
}

function cartDecrease(index){
    if(carts[index].count >1) {
        carts[index].count--
        loadCart()
    }
}
function cartIncrease(index){
        carts[index].count++
        loadCart()
}

function toCurrency(nominal){
    nominal = nominal.toString()
    var x = ""
    for(var i = 1; i<=nominal.length; i++){
        x += nominal[nominal.length - i]
        if(i % 3 == 0 && i != nominal.length){
            x += "."
        }
    }
    return 'Rp. '+x.split('').reverse().join('')
}

function radioController(value, name){
    if(value){
       return '<input type="radio" checked onclick="" name="'+name+'"/>'
    }
    return '<input type="radio" onclick="" name="'+name+'"/>'
}

function loadCart(){
    document.getElementById('cart-list').innerHTML=""
    var h = ""
    carts.map((item, index) => {
        var total = toCurrency(item.price*item.count)
        var radioCicil = radioController(item.cicil, index)
        var radioFull =  radioController(!item.cicil, index)
        h +='<div class="row" style="margin-top: 24px">' +
                '<div class="col">' +
                item.title +
                '</div>' +
                '<div class="col">' +
                    total+
                '</div>' +
                '<div class="col">' +
                    '<div class="d-flex counter-button justify-content-around">' +
                        '<button type="button" class="count-controll" onclick="cartDecrease('+index+')">' +
                            '-' +
                        '</button>' +
                        '<div class="counter">'+item.count+'</div>'+
                        '<button type="button" class="count-controll" onclick="cartIncrease('+index+')">' +
                        '+' +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="col">' +
                    '<div class="cicilan-card d-flex justify-content-around align-items-center">' +
                        radioFull +
                        '<div>' +
                            '<div style="font-size: 12px">Bayar full</div>' +
                            '<div style="font-size: 6px">(Potongan 2.5%)</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="col">' +
                    '<div class="cicilan-card d-flex justify-content-around align-items-center">' +
                        radioCicil +
                    '<div>' +
                    '<div style="font-size: 12px">Bayar DP</div>' +
                    '<div style="font-size: 6px">'+toCurrency(item.price*item.count*70/100)+'</div>' +
                    '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
    })

    document.getElementById('cart-list').insertAdjacentHTML("beforeend", h)
}