let main=document.getElementById('main');
const addUserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const showMillionairesBtn=document.getElementById('show-millionaires');
const sortBtn=document.getElementById('sort');
const calculateWealthBtn=document.getElementById('calculate-wealth');
let list=document.getElementById('listItem');

let data=[];


// fetch random user and add money
async function getRandomUser(){
   const res= await fetch('https://randomuser.me/api');
  
   const data=await res.json();
  
   const user=data.results[0];
   
   const newUser={
       name:`${user.name.first} ${user.name.last}`,
       money:Math.floor(Math.random()*1000000)
   };
   console.log(newUser);
   addData(newUser);
}

// Add new obj to data arr
function addData(obj){
    data.push(obj);
    updateDOM();
}

// Update DOM
function updateDOM(providedData=data){
    //clear main div
    main.innerHTML='<h2><strong>Person</strong>Wealth</h2>';
    
    
    providedData.forEach(items=>{
        const element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${items.name}</strong>  ${formatMoney(items.money)}`;
        main.appendChild(element);
    });
   
}

//format money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double Money
function doubleMoney(){
    data=data.map(
        (user)=>{return  {...user,money: user.money*2}});
    updateDOM();
}

// Sort By Richest
function sortByRichest(){
    data.sort(function(a,b){return a.money-b.money});

    updateDOM();
}

// show only millionaires
function showMillionaires(){
    
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//calculate Wealth
function calculateWealth(){
    let wealth=0;
    data.forEach(items=>{
        wealth+= +items.money;
    });
    let element=document.createElement('div');
    element.classList.add('total');
    element.innerHTML=`<strong>Total Wealth</strong> ${formatMoney(wealth)}` ;
    main.appendChild(element);
}

// Event Listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);