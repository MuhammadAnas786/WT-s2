const UserObject = [
    {

    }
];
var updateObject;
$(function() {
 
    loadUsers();
    $("#add").click(addRow);
    $("#update").click(updateRow);
    $("#reset").click(resetRow);
  });

function loadUsers(){
    fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) =>json.forEach(({id,name,email})=>{
      let obj = {
          id,name,email
      };
      UserObject.push(obj);
    $("#tbody").append(`<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    
    <td>
        <button class="edit" id="${id}"  onclick="editRow(this)">Edit</button>
        <button class="Remove" id="${id}" onclick="removeRow(this)">Remove</button>
    </td>
</tr>`)
})
  );

}
  
  
function addRow() {
   
    if(checkValidity()){
        const name = $("#name").val();
     const mail =  $("#email").val();
    // if(UserObject.some(e => e.name === name))
 let len = UserObject.length-1;
    let obj = {
       id:(UserObject[len].id+1),
        name,mail
    }
    let obj2 = {
        name,mail
     }
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(obj2),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    UserObject.push(obj);

console.log(obj)
    // const { name,gender,age,city } = Obj;
    $("#tbody").append(`<tr>

        <td>${obj.id}</td>
        <td>${name}</td>
        <td>${mail}</td>
        
        <td>
            <button class="edit" id="${obj.id}"  onclick="editRow(this)">Edit</button>
            <button class="Remove" id="${obj.id}" onclick="removeRow(this)">Remove</button>
        </td>
    </tr>`)
   
    }
    // myFunction();
   

  
}
// 
function removeRow(oButton) {
    // setIndex();
    console.log(oButton.parentNode.parentNode.rowIndex)
    UserObject.filter(e => e.id===oButton.id);
    document.getElementById("table").deleteRow(oButton.parentNode.parentNode.rowIndex);
    fetch(`https://jsonplaceholder.typicode.com/users/${oButton.id}`, {
        method: 'DELETE',
      });
    
console.log(oButton.parentNode.parentNode.rowIndex);

}

function editRow(oButton) {
    // setIndex();
    const name = $("#name");
    const email = $("#email")
    let row = $(oButton).parents("tr")
    var cols = row.children("td");
    $("#name").val($(cols[1]).text());
    $("#email").val($(cols[2]).text());
    $("#update").attr("disabled", false);
    $("#add").attr("disabled", true); 
updateObject = oButton

}
function updateRow(){
if(updateObject&&checkValidity()){
    const name = $("#name").val();
    const email =  $("#email").val();
    UserObject[updateObject.id].name = name;
    UserObject[updateObject.id].email = email;
    
    fetch(`https://jsonplaceholder.typicode.com/users/${updateObject.id}`, {
  method: 'PUT',
  body: JSON.stringify(UserObject[updateObject.id]),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
   

    $("#update").attr("disabled", true);
    $("#add").attr("disabled", false);
    updateObject='';
    let row = $(updateObject).parents("tr")
    var cols = row.children("td");
    cols[1].innerText=name;
    cols[2].innerText=email
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
    let email= $("#email").val();
    if(name&&email)
        return true
    else false
}