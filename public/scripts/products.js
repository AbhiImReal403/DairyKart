// Update Pruducts in page fn

const updatePro = (dets) => {

    let title = '';

    if(dets.title.trim().substring(0,dets.title.indexOf('-')-1).length > 0){
        title = dets.title.trim().substring(0,dets.title.indexOf('-')-1);
    }else{
        title = dets.title.trim().substring(0,dets.title.indexOf(','));
    }

    const html = `
    <div class="card col-lg-4 productCard" style="width: 20rem;" data-product-cata="${dets.catagory}" data-productId="${dets.id}" data-product-title="${dets.title}" data-productPrice="${dets.price}" data-productFile ="${dets.filename}">
            <img src="/static/images/products/${dets.filename}" class="ms-2 mb-4 mt-2 card-img-top d-flex justify-content-center" alt="..." style="height:200px !important; width:230px !important">
            <div class="card-body w-100 pb-0 mb-1" style="height:200px !important; width:300px !important">
                <a href="/product/${dets.id}" class="card-title"><h5 class="card-title text-justify mb-3">${title}</h5></a>
                <p class="card-text text-muted w-auto mb-3 text-justify text-left" width:200px !important" >${dets.description}</p>
                <div class="mb-3 justify-content">
                    <p class="display-6 ms-3 my-4 me-3 d-inline text-dark fw-bold">&#8377; ${dets.price}</p>
                    <span class="btn btn-primary addCart">Add to Cart</span>
                </div>
            </div>
    </div>
    `;

    // console.log(typeof dets.price)

    // console.log());

    if(window.location.pathname !== '/cart'){
        product.innerHTML += html;
    }
    
}


// Upadate Products in Cart Fn

const updateKart = () =>{

    const cart = localStorage.getItem('cartedItem');
    const cartBadge = localStorage.getItem('cartBadge');

    if(cart !== null ){
        JSON.parse(cart).forEach( (data) => {

            const html = `
            <li class= "smkartItem" data-productPrice="${data.price}" data-productId = ${data.id}><span class="dropdown-item">${data.product} - &#8377; ${data.price} <span class="btn btn-danger rounded btn-sm">x</span></span></li>
            `;
            
            cartDrop.firstElementChild.insertAdjacentHTML('afterend',html);


        });
        // console.log(JSON.parse(cart));
    }

    if(cartBadge === null || cartBadge < '0'){
        localStorage.setItem('cartBadge','');
    }
    else{
        cartCount.textContent = cartBadge;
    }

    let locoSub = localStorage.getItem('subtotal');
    
        if(locoSub === null || locoSub === 0){
                locoSub = '0';
                subTotal.textContent = 'empty';
                // kartSubtotal.textContent = "₹ 0";
        }
        const cartSubtotal = `Subtotal : ${locoSub}$ `;

        subTotal.textContent = cartSubtotal;


}




// Product Catagory Filter Fn

    const filterPage = (catagory) => {
    
    switch(catagory) {
        case null:
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
            data.classList.add("d-flex");
            data.classList.remove("d-none")
            }
            });
            break;

        case "lassi":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'lassi'|| data.dataset.productCata === 'buttermilk'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "milk_powder":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'milk_powder'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "flavoured_milk":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'flavoured_milk'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "cheese":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'cheese'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "yoghurt":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'yoghurt'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "curd":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'curd'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "paneer":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'paneer'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "butter":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'butter'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "buttermilk":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'buttermilk'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }
        case "milk":
            {
            product.childNodes.forEach(data=> {
            if(data.firstChild !== null){
                if(data.dataset.productCata === 'milk'){
                    data.classList.add("d-flex");
                    data.classList.remove("d-none");
                }else{
                    data.classList.add("d-none");
                    }
                }
                });
            break;
            }

          // code block
        default:
            {
                console.log("entered catagory doesnt exist ", catagory);
                // data.classList.remove("d-none");
            }
          // code block
      }

    }


