//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();

//call event listener
eventListener();

function eventListener() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all items
    deleteAll.addEventListener('click', deleteAllItems)

}

//load items and localstorage
function loadItems(){

items = getItemsFromLS();

 items.forEach(function(item){
   CreateItem(item);
 })
};

//get items from localstorage
function getItemsFromLS(){
    if(localStorage.getItem('items') ===null){
     items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

//set items to localstorage
function setItemLocalStorage(text){
items = getItemsFromLS();
items.push(text);
localStorage.setItem('items',JSON.stringify(items));
}

//delete item from LS
function deleteItemLS(text){
items = getItemsFromLS();

items.forEach(function(item,index){
    if(item ===text){
        items.splice(index,1)
    }
    localStorage.setItem('items',JSON.stringify(items))
})
}

function CreateItem(text){
  //create li
  const li = document.createElement('li');
  li.className = 'list-group-item list-groupt-item-secondary'
  li.appendChild(document.createTextNode(text))

  //create a
  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href', '#');
  a.innerHTML = '<i class="fas fa-times"></i>'

  //add a to li
  li.appendChild(a);

  //add li to ul
  taskList.appendChild(li);

}

//add new item
function addNewItem(e) {

    if (input.value.trim() === '') {
        alert('add new text')
    }
    else {
        //create item
         CreateItem(input.value);
         
         //save to LS
         setItemLocalStorage(input.value)

        //clear input 
        input.value = '';

    }


    e.preventDefault();
}

//delete an item
function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();

        //delete item from LS
        deleteItemLS(e.target.parentElement.parentElement.textContent);

    }


    e.preventDefault();
}

//delete all items
function deleteAllItems(e) {
    if (confirm('Are You Sure?')) {

       // taskList.innerHTML = '';
        
       while(taskList.firstChild){
          taskList.removeChild(taskList.firstChild);
       }
        localStorage.clear();
    }



    e.preventDefault();
}

