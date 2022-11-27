const cartSection = document.querySelector('.cartCheckout');

const invoiceBody = document.querySelector(".invoiceBody");

const kartSubtotal = document.querySelector("body > div > section > section:nth-child(2) > div > div.col-md-4.invoiceCard > div > div:nth-child(4) > p:nth-child(1) > span");

const finalTotal = document.querySelector(".finalTotal");

const locoUpdateCart = (opt,product,price,id,filename) =>{
    let title = '';
    if(product !== null){
        if(product.trim().substring(0,product.indexOf('-')-1).length > 0){
            title = product.trim().substring(0,product.indexOf('-')-1)
        }else{
            title = product.trim().substring(0,product.indexOf(',')-1)
        }
    }
    

    const cartedHtml = { 
        html : `<div class="card m-4 itemCard">
        <div class="card-body w-100">
            <h5 class="card-title mb-3">${title}</h5>
            <img class="img d-flex justify-content-start" src="images/products/${filename}" style="width:100px; height:100px">
            <p class="card-text text-muted w-auto mb-3">${product}</p>
            <div class="mb-3 d-flex justify-content-end align-items-center">
                <p class="display-6 ms-3 my-4 me-3 d-inline text-dark fw-bold">₹ ${price}</p>
                <span class="btn btn-danger rmCart " data-productId="${id}" data-productPrice="${price}">Remove from Cart</span>
            </div>
        </div>
        </div>`,
        product : `${product}`, price : `${price}`,id: `${id}`
    };
    let carted = null;

    if(localStorage.getItem('cartedItem')===null){
        carted = new Array();
        localStorage.setItem('cartedItem',JSON.stringify(carted));
        }


    if(opt === 'add'){
        carted = JSON.parse(localStorage.getItem('cartedItem'));

        carted.push(cartedHtml);
        localStorage.setItem('cartedItem',JSON.stringify(carted));
        // carted.pop();
        // localStorage.setItem('cartedItem',JSON.stringify(carted));
        }
    else{
        carted = JSON.parse(localStorage.getItem('cartedItem'));
        carted.some((data,index,arr) =>{
            // console.log(arr);
            if(data.id === id){
                arr.splice(index,1);
                return true;
            }
            // console.log(data)
        });


        localStorage.setItem('cartedItem',JSON.stringify(carted));
    }

}



const updateKartPage = () =>{

    if(product.classList.contains('kartpage')){

        // console.log(localStorage.getItem('cartedItem'));

        if(localStorage.getItem('cartedItem') !== null){
            const data = localStorage.getItem("cartedItem");

            
    
            JSON.parse(data).forEach(data => {

                // console.log(cartSection.firstElementChild.firstElementChild);

                cartSection.firstElementChild.firstElementChild.insertAdjacentHTML("afterend",data.html)

             // invoice dynamic update

                const html = `
                <p class="card-text" data-productId="${data.id}">${data.product} - <span class="d-flex justify-content-end"> ₹ ${data.price}</span></p>
                `;

                invoiceBody.insertAdjacentHTML('afterbegin',html);
            });

            kartSubtotal.textContent = `₹ ${localStorage.getItem('subtotal')}`;
            
            if(localStorage.getItem('subtotal') == "0"){
                
            }else{
                finalTotal.textContent = `₹ ${Number(localStorage.getItem('subtotal'))+20}`;
            }
            

            


           


        }

        // console.log(cartSection.firstElementChild.firstElementChild.nextElementSibling);
        if(cartSection.firstElementChild.firstElementChild.nextElementSibling === null){
            const html = `<div class=" m-4">
            <div class="card-body w-100">
                <p class="card-title mb-3 text-muted">Cart Empty ...</p>
            </div>
          </div>`
    
          cartSection.firstElementChild.firstElementChild.insertAdjacentHTML("afterend",html)
    
        }
    }
    
}

