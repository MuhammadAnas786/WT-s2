const UserObject = [
    {

    }
];
var updateObject;
$(function() {
 
    loadUsers();
    $("#update").click(updateRow);
    $("#reset").click(resetRow);
  });

function loadUsers(){
    fetch('https://jsonplaceholder.typicode.com/albums')
  .then((response) => response.json())
  .then((json) =>json.forEach(({id,title,userId})=>{
      let obj = {
          id,title,userId
      };
      UserObject.push(obj);
    $("#tbody").append(`<tr>
    <td>${id}</td>
    <td>${title}</td>
    <td>${userId}</td>
    
    <td>
        <button class="edit" id="${id}"  onclick="editRow(this)">Edit</button>
        <button class="Remove" id="${id}" onclick="removeRow(this)">Remove</button>
    </td>
</tr>`)
})
  );

}
  

// 
function removeRow(oButton) {
    // setIndex();
    console.log(oButton.parentNode.parentNode.rowIndex)
    UserObject.filter(e => e.id===oButton.id);
    document.getElementById("table").deleteRow(oButton.parentNode.parentNode.rowIndex);
    fetch(`https://jsonplaceholder.typicode.com/albums/${oButton.id}`, {
        method: 'DELETE',
      });
    
console.log(oButton.parentNode.parentNode.rowIndex);

}

function editRow(oButton) {
    // setIndex();
    const name = $("#name");
    
    let row = $(oButton).parents("tr")
    var cols = row.children("td");
    $("#name").val($(cols[1]).text());
   
    $("#update").attr("disabled", false);
   
updateObject = oButton

}
function updateRow(){
if(updateObject&&checkValidity()){
    const name = $("#name").val();
  
    UserObject[updateObject.id].title = name;
    
    fetch(`https://jsonplaceholder.typicode.com/albums/${updateObject.id}`, {
  method: 'PUT',
  body: JSON.stringify(UserObject[updateObject.id]),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
   

    
   
    
    let row = $(updateObject).parents("tr")
    var cols = row.children("td");
    cols[1].innerText=name;
    updateObject='';
    $("#update").attr("disabled", true);
  //  window.location.reload()

}
else alert("Can't find the row to update")
}


function resetRow(){
        
    formClear();
        $("#update").attr("disabled", true);
        $("#add").attr("disabled", false);
        updateObject='';
    
     }
function checkValidity(){
    let name = $("#name").val();
   
    if(name)
        return true
    else false
}