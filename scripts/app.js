const product =  document.querySelector('.products');
const cartCount = document.querySelector('#CartCount');
const cart = document.querySelector('.cartify');
const cartDrop = document.querySelector('ul.cartList');
const subTotal = document.querySelector('.subTotal');
const smkartItem = document.querySelector('.smkart');
let cartItemcard = document.querySelectorAll('div.itemCard');
const pageArea = document.querySelector(".page-area")
const productCard = document.querySelectorAll(".productCard");
const cartDel = document.querySelectorAll('#navbarSupportedContent > div.cartify.me-5.ms-5.ps-5.me-5.mb-2.mb-lg-0.ms-lg-0.ps-lg-0 > div > ul > li.smkartItem');
const search = document.querySelector('.searchForm input');
const searchForm = document.querySelector('.searchForm');
const kartList = document.querySelector('.kartInvoicelist');
const kartPage = document.querySelector(".kartPage");




// fetch('products.json').then((response) => {
//     // console.log(response);
//     return response.json();
//     }).then((data) => {
//     data.forEach((data => {
//         updatePro(data);
//     }))
//     }).catch(err=>{
//     console.log(err);
//     })
    
//     window.onbeforeunload = updateCart();
//     window.onbeforeunload = updateKartPage();
    



// Update Invoice Fn

const updateInviceSheet = (id) =>{

    // console.log(invoiceBody.children)
    
    // console.log(id);

    Array.from(invoiceBody.children).every(item => {

        // console.log(item.dataset.productid);
        
        if(item.dataset.productid === id){
            // console.log(item);
            item.remove();

            // console.log('fired',id)
            
            return false;
        }
        else{
            return true;
        }
    })

}


const sycDel = (e,id) =>{

    // console.log(e.target.classList.contains('rmCart'));
    
    if(e.target.classList.contains('rmCart')){

        Array.from(cartDrop.children).every(item => {
            // console.log(item.getAttribute('data-productid'));
            if(item.getAttribute('data-productid') === id){
                item.remove();
                // console.log("done");
                return false;
            }
            else{
                return true;
            }
        })

    }
    else{
         Array.from(kartList.children).every(item => {
            console.log(item);
        });
         Array.from(cartSection.children).every(item => {
            console.log(item);
        });


    }



}



// Add to Cart Fn

const updateCart = (product='fake',product_cost,productid) =>{
    const html = `
    <li data-productPrice="${product_cost}" class= "smkartItem" data-productId = ${productid}><span class="dropdown-item">${product} - ${product_cost}$ <span class="btn btn-danger rounded btn-sm">x</span></span></li>
    `;
    
    // console.log(product_cost)
    // console.log(cartDrop.)

    cartDrop.firstElementChild.insertAdjacentHTML('afterend',html);

    cartCount.innerHTML= Number(cartCount.textContent)+1;
    
    localStorage.setItem('cartBadge', (Number(localStorage.getItem('cartBadge')) + 1));

        let locoSub = localStorage.getItem('subtotal');

        // console.log(locoSub);
        
        if(locoSub === '0'){
            locoSub = product_cost;
        }else if(locoSub !=='0'){
            locoSub = Number(locoSub) + product_cost;
        }

        localStorage.setItem('subtotal',locoSub);

        const cartSubtotal = `Subtotal : ₹ ${locoSub} `;

        subTotal.textContent = cartSubtotal;

    // localStorage.setItem('subtotal',locoSub);
    
    

}


// Delete Item Fn

const rmCarted = e => {
    // console.log(e.target.classList)
    if(e.target.classList.contains('btn-sm')){
        
        // remove product from cart
        if(e.target.parentElement.parentElement.classList.contains('smkartItem')){
            e.target.parentNode.parentNode.remove();
        }else{
            console.log('else line ')
        }
        
        


        // update cart badge
        if(cartCount.textContent==='1'){
            cartCount.innerHTML='';
            localStorage.setItem('cartBadge','');

        }else{
            if(localStorage.getItem('cartBadge') === null || Number(localStorage.getItem('cartBadge')) <= 0){
                localStorage.setItem('cartBadge','');
                cartCount.innerHTML='';


            }else{
                
                localStorage.setItem('cartBadge', (Number(localStorage.getItem('cartBadge')) - 1));
                cartCount.innerHTML= localStorage.getItem('cartBadge');
            }
        }

        // console.log(e.target.parentNode.parentNode);




        // update new subtotal

        let locoSub = localStorage.getItem('subtotal');
       if(locoSub !=='0'){
            locoSub = Number(locoSub) - e.target.parentNode.parentNode.getAttribute('data-productPrice') ;
            
            if(locoSub === 0 || locoSub<0){
                locoSub = '0';
                subTotal.textContent = 'empty';
                // kartSubtotal.textContent = `₹ ${locoSub}`;
            }else{
                const cartSubtotal = `Subtotal : ₹ ${locoSub} `;
                subTotal.textContent = cartSubtotal;
                // kartSubtotal.textContent = `₹ ${locoSub}`;

            }
        } 
        localStorage.setItem('subtotal',locoSub);

        // update loco cart item

        locoUpdateCart('del',null,null,e.target.parentElement.parentElement.getAttribute('data-productId'),null);
        
        // updateInviceSheet(e.target.parentElement.parentElement.getAttribute('data-productId'));

        // sycDel(e,e.target.parentElement.parentElement.getAttribute('data-productId'));

        // console.log()
        

        // if(product.classList.contains('kartpage')){

        //     updateKartPage();
        //     // cartItemcard.remove();

        // }

    }
}

// Search Fn - Search Products in page

const filterSearch = term => {

    // console.log(Array.from(list.children));

    Array.from(product.children)
        .forEach((product) =>{
            // console.log("1",product.getAttribute("data-product-title").includes(term));
            if(product.getAttribute("data-product-title").toLowerCase().includes(term)){
                // console.log(product)
                // console.log(product.classList)
                product.classList.remove('filtered')
                // console.log(product.classList)
            }else{
                product.classList.add('filtered');
            }
        })
    Array.from(product.children)
    .filter((product) => {
        !product.getAttribute("data-product-title").toLowerCase().includes(term);
        // console.log(product.getAttribute("data-product-title"));
    })
    .forEach(product => product.classList.remove('filtered'));
};




// Delete cart Items

cart.addEventListener('click', e => {
    e.stopPropagation();

    rmCarted(e);

    
});


// Page events

pageArea.addEventListener('click', e =>{
    e.stopPropagation();
    e.preventDefault();


// Add to cart - dropdown cart sec

    if(e.target.classList.contains('addCart')){
        // const productTitle = .substring(0,productContent.indexOf('-',0));
        const productTitle = e.target.parentNode.parentNode.parentNode.getAttribute("data-product-title");
        const productPrice = Number(e.target.parentNode.parentElement.parentElement.getAttribute("data-productPrice"))
        const productId = e.target.parentNode.parentNode.parentNode.getAttribute("data-productId")
        const productFile = e.target.parentNode.parentNode.parentNode.getAttribute("data-productFile")



        updateCart(productTitle,productPrice,productId);

        locoUpdateCart("add",productTitle,productPrice,productId,productFile);


        // console.log(e.target.parentNode.parentElement.parentElement.getAttribute("data-productPrice"));        
    }

   
// remove from cart - cartPage

    if(e.target.classList.contains('rmCart')){

        // console.log(typeof e.target.parentElement.parentElement.parentElement.previousElementSibling.innerHTML);
        
        if(e.target.parentElement.parentElement.parentElement.nextElementSibling !== null || e.target.parentElement.parentElement.parentElement.previousElementSibling !== null){
            e.target.parentElement.parentElement.parentElement.remove();
        //     if(e.e.target.parentElement.parentElement.parentElement.previousElementSibling.innerHTML =="Carted Items" ){
        //         const html = `<div class=" m-4">
        //     <div class="card-body w-100">
        //         <p class="card-title mb-3 text-muted">Cart Empty ...</p>
        //     </div>
        //   </div>`
    
        //   cartSection.firstElementChild.firstElementChild.insertAdjacentHTML("afterend",html);
        //     }
        }else{
            e.target.parentElement.parentElement.parentElement.remove();
            const html = `<div class=" m-4">
            <div class="card-body w-100">
                <p class="card-title mb-3 text-muted">Cart Empty ...</p>
            </div>
          </div>`
    
          cartSection.firstElementChild.firstElementChild.insertAdjacentHTML("afterend",html);
        }
        rmCarted(e);
        
        // console.log(cartDel);
        // console.log(cartDel.forEach((data) => {
        //     console.log(data)
        // }));






        // update Badge

        if(cartCount.textContent==='1'){
            cartCount.innerHTML='';
            localStorage.setItem('cartBadge','');

        }else{
            if(localStorage.getItem('cartBadge') === null || Number(localStorage.getItem('cartBadge')) <= 0){
                localStorage.setItem('cartBadge','');
                cartCount.innerHTML='';

            }else{
                
                localStorage.setItem('cartBadge', (Number(localStorage.getItem('cartBadge')) - 1));
                cartCount.innerHTML= localStorage.getItem('cartBadge');


            }
        }




        // update subtotal

        let locoSub = localStorage.getItem('subtotal');

       if(locoSub !=='0'){
            locoSub = Number(locoSub) - e.target.getAttribute('data-productPrice') ;
            // console.log(locoSub)

            if(locoSub === 0 || locoSub < 0){
                locoSub = '0';
                subTotal.textContent = 'empty';
                kartSubtotal.textContent = "₹ 0";

            }else{
                const cartSubtotal = `Subtotal : ₹ ${locoSub} `;
                subTotal.textContent = cartSubtotal;
                
                kartSubtotal.textContent = `₹ ${locoSub}`;

            }
        } 
        localStorage.setItem('subtotal',locoSub);

        if(localStorage.getItem('subtotal') == "0"){
            finalTotal.textContent = "₹ 0";
        }else{
            finalTotal.textContent = `₹ ${Number(localStorage.getItem('subtotal'))+20}`;
        }


        // update local json

        locoUpdateCart('del',null,null,e.target.getAttribute("data-productId"),null);

        // console.log(e.target.getAttribute("data-productId"));


        updateInviceSheet(e.target.getAttribute("data-productId"));

        sycDel(e,e.target.getAttribute("data-productId"));
        // console.log(e.target.getAttribute("data-productId"))

        // updateKartPage();/
    }
})


// Search Keyup

search.addEventListener('keyup',() => {
    // console.log(term); 

    // console.log(window.location.href.includes('/cart.html'));
    // console.log(window.location.pathname);
    if(!window.location.pathname.includes('cart.html')){
        const term = search.value.toLowerCase().trim();
        
        filterSearch(term);
    }

    // list.children.forEach(todo => todo.classList.add('filtered'));

});



// Search in Kart Page

searchForm.addEventListener('submit',(e) => {
    // console.log(window.location.href.includes('/cart.html'));

    e.preventDefault();

    if(window.location.pathname.includes('/cart.html')){

        console.log(location.href)
        console.log("het")

        window.location.href= "http://127.0.0.1:5500/index.html";


    }

    // list.children.forEach(todo => todo.classList.add('filtered'));

})






fetch('/products.json').then((response) => {
// console.log(response);
return response.json();
}).then((data) => {
data.forEach((data => {
    updatePro(data);
}))
}).catch(err=>{
console.log(err);
})

window.onbeforeunload = updateKart();
window.onbeforeunload = updateKartPage();









// 

// unfinished features







// update invoice sheet

// const updateInviceSheet = () =>{

//     // console.log(Array.from(invoiceBody))

//     // Array.from(invoiceBody.children).forEach((data,index,arr) => {

//     //     if(data.dataset.productid==id){
//     //         arr.splice(index,1);
//     //         HTMLCollection.from()

//     //     }
//     // })
            
    
//     JSON.parse(localStorage.getItem("cartedItem")).forEach(data => {

//         cartSection.firstElementChild.firstElementChild.insertAdjacentHTML("afterend",data.html)

//         // invoice dynamic update

//         const html = `
//         <p class="card-text" data-productId="${data.id}">${data.product} - <span class="d-flex justify-content-end"> ₹ ${data.price}</span></p>
//         `;

//         invoiceBody.insertAdjacentHTML('beforeend',html);
//     });

// }
