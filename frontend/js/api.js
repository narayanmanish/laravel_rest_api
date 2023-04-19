

function del(id)
{
    fetch(`http://127.0.0.1:8000/api/students/${id}/delete`,{
        method: 'delete'
    })
    .then(res => res.json())
    .then(res => console.log(res));
   // window.location.reload();
}
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
   // data.student 
    

let mydata=`
    
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Name</label>
        <input type="hidden" id="id" value="${data.student.id}" >
        <input type="text" class="form-control" id="name" value="${data.student.name}">
      </div>
      <div class="form-group col-md-6">
        <label for="name">Course</label>
        <input type="text" class="form-control" id="course" value="${data.student.course}">
       </div>
       <div class="form-group col-md-6">
        <label for="name">Email</label>
        <input type="email" class="form-control" id="email" value="${data.student.email}">
       </div>
       <div class="form-group col-md-6">
        <label for="name">Phone</label>
        <input type="text" class="form-control" id="phone" value="${data.student.phone}">
       </div>
    </div>

    <button type="submit" name="submit" data-dismiss="modal" class="btn btn-primary">Edit Student</button>
  `;
  document.getElementById("formedit").innerHTML=mydata;

}

const editForm = document.getElementById('formedit');
 console.log(editForm);
editForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    data={
        id : editForm.id.value,
        name : editForm.name.value,
        course : editForm.course.value,
        email  : editForm.email.value,
        phone  : editForm.phone.value
    };
    console.log(data);
    record=JSON.stringify(data)
    let response = await fetch(`http://127.0.0.1:8000/api/students/${data.id}/edit`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: record
    });

    let result = await response.json();
    //alert(result.message)
    console.log(result)
    
})
 

function edit(id)
{
    const api_url = 
    `http://127.0.0.1:8000/api/students/${id}/edit`; 
    // Calling that async function
    getapi(api_url);
}





 const thisForm = document.getElementById('form');
 
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    data={
        name : thisForm.name.value,
        course : thisForm.course.value,
        email  : thisForm.email.value,
        phone  : thisForm.phone.value
    };
    record=JSON.stringify(data)
    let response = await fetch('http://127.0.0.1:8000/api/students/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: record
    });

    let result = await response.json();
    //alert(result.message)
    //console.log(result)
    if(result.status==200)
    window.location.reload();
  //  window.location.reload();
})
 
 
 // function to handle success
 function success() {
    var data = JSON.parse(this.responseText); //parse the string to JSON
    //console.log(data.status);
    var showdata='',i=1;
    if(data.status!=404)
    {
    //console.log(data.students);
    
    data.students.forEach((student) => {
        //console.log(student);
    showdata += `<tr>
    <th scope="row">${i++}</th>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.created_at}</td>
      <td>${student.updated_at}</td>
      <td>
  
      <button type="button" class="btn btn-primary " id="editbtn" onclick="edit(${student.id})" data-toggle="modal" data-target="#editModal">
  Edit
</button>
        </td>
       <td>
        <button type="button" class="btn btn-danger" id="delbtn" onclick="del(${student.id})" >
        Delete
      </button>
      </td>
      </tr>
      `;
      document.getElementById("loaddata").innerHTML=showdata;
});

    }
    else{
        let showdat=`<tr>
            <th scope="row" colspan="7" align="center">Data not Found</th>
               </tr>
      `;
      document.getElementById("loaddata").innerHTML=showdat;
    }
}

// function to handle error
function error(err) {
    console.log('Request Failed', err); //error details will be in the "err" object
}

var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
xhr.onload = success; // call success function if request is successful
xhr.onerror = error;  // call error function if request failed
xhr.open('GET', 'http://127.0.0.1:8000/api/students/'); // open a GET request
xhr.send(); // send the request to the server.
//myModal.hide()