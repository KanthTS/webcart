let cart=[];
let allItems=[];
 async function fetching()
 {
  let res= await fetch('https://fakestoreapi.com/products')
     allItems=await res.json();
    displayItems(allItems);
    
 }
 function displayItems(item)
 {
    let itemContains=document.getElementById('items-container');
     itemContains.innerHTML='';
     item.map(item=>{
        itemContains.innerHTML +=`
          <div class="card" style="margin-top:30px;box-shadow:0px 0px 4px 0px;background-color:silver">
          
          <div class="card-header">
          <img src="${item.image}"class="card-img-top" alt="${item.title}" style="width:300px;height:200px;text-align:center">
          
          </div> 
          <div class="card-body" style="text-align:center">
          <h4>${item.title}</h4>
          <h6>Price:$${item.price}</h6>
          <h6>Rating:${item.rating.rate}</h6>
          </div>
          <div class="card-header">
          <button onclick="add(${item.id},${item.price})" style="background-color:green">Add To Cart</button>
          </div>
          </div>
        
        `
     });

 }
 function add(value,price){
   let itemExists=cart.find(product=>product.id===value);
   if(itemExists){
    itemExists.quantity+=1;
    
   }
   else{
     const product={
        id:value,
        price:price,
        quantity:1
    };
     cart.push(product) 
    
   }
   displayCart();
 }
 function displayCart(){
  let display=document.getElementById('cart-container');
  display.innerHTML='';
  cart.forEach(item=>{
    display.innerHTML+=`<div class="items" style="background-color:aqua">
       <h3 style="color:red">ItemId:${item.id}</h3>
       
         <div class="item" style=" display:flex;justify-content:space-evenly">
         <button onclick="increase(${item.id})" style="background-color:green">+</button>
         <h4 style="color:green">Quantity:${item.quantity}</h4>
        <button onclick="decrease(${item.id})" style="background-color:red" >-</button>
         </div>
       <h4>Product price:${item.price}</h4>
       <h4>Total Price:${item.price *item.quantity}</h4>
     
    </div>
    
   `
    
    
  })
 }
 function increase(id)
 {
  let i=cart.find(i=>i.id===id)
  if(i)
  {
    i.quantity +=1;
  }
  displayCart();
    
    
 }
 function decrease(id)
 {
    let i=cart.find(i=>i.id===id)
    if(i)
    {
        i.quantity -=1;
    }
    displayCart();
 }
  function searchBar()
 {
    let search=document.getElementById('input-type').value.toLowerCase()
 
        const filtered=allItems.filter(item=>item.title &&item.title.toLowerCase.includes(search));
        displayItems(filtered);


 }
 document.getElementById('submit').addEventListener('click',searchBar);
 fetching();