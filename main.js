import menuArray from "./data.js";

const orderItems = []
const menuItems = document.querySelector(".menu-items");
const orderDetailsEl = document.getElementById('order-details')
const orderItemEl = document.querySelector(".order-items")
const orderTotalPrice = document.getElementById('order-total-price')
const paymentDetailsEl = document.getElementById('payment-details')

paymentDetailsEl.addEventListener('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)

    let customerName = formData.get('customername')

    orderDetailsEl.innerHTML = `<div class="order-placed">
                                    Thanks, ${customerName}! Your order is on its way!
                                </div>`

    this.parentElement.style.display = 'none';

})
function renderItem(item)
{
    return `<div class="item">
                <p class="emoji">${item.emoji}</p>
                <div class="item-description">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(', ')}</p>
                    <h4>$${item.price}</h4>
                </div>
                <button id="add-item-${item.id}" data-add-item-id="${item.id}" class="add-item">+</button>
            </div>`
}
function renderMenu(menuArray)
{
    let menuItemsHtml = menuArray.map(renderItem).join()
    menuItems.innerHTML += menuItemsHtml

}

renderMenu(menuArray)

document.addEventListener('click',(e)=>{
    // console.log(e.target.id)
    console.log(e.target.dataset.addItemId)
    if(e.target.dataset.addItemId)
    {
        addItem(e.target.dataset.addItemId)
    }
    else if(e.target.dataset.removeItemId)
    {
        removeItem(e.target.dataset.removeItemId)
    }
    else if(e.target.id === 'complete-order')
    {
        document.getElementById('payment-capture').style.display = 'flex';
    }
})

function removeItem(id)
{
    let idNum = Number(id)
    for(let i=0;i<orderItems.length;i++)
    {
        if(orderItems[i].id === idNum)
        {
            orderItems.splice(i,1)
        }
    }



    renderOrder()
}
function addItem(id)
{
    let idNum = Number(id)
    const newItem = menuArray.find(
                (item) =>
                    item.id === idNum)
    //console.log(newItem)
    orderItems.push(newItem)

    console.log(orderItems)
    renderOrder()
}

function renderOrder()
{
    console.log(Boolean(orderItems))

    if(orderItems.length >= 1)
    {
        orderDetailsEl.style.display = 'flex';
    }
    else
    {
        orderDetailsEl.style.display = 'none';
        return;
    }

    orderItemEl.innerHTML = orderItems.map((item)=>
        {
            return `<div class="order-item">
                        <h3>${item.name}</h3>
                        <button data-remove-item-id="${item.id}">remove</button>
                        <h4>$${item.price}</h4>
                    </div>`
        }).join('')


    //console.log(orderItemEl.innerHTML)
    orderTotalPrice.textContent = '$' + orderItems.reduce((total,next)=>
                                                {return total+next.price}
        ,0)
}
