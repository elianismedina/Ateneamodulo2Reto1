let name = sessionStorage.getItem('username');
if(name === 'NO DEFINIDO') {
   document.getElementById('userGreeting').innerText = "No existe un usuario con las credenciales dadas";
}else if(name !=null){
   document.getElementById('userGreeting').innerText = "Bienvenid@ " +name;
   $.ajax({

       url: 'http://localhost:8090/api/user/all',
       type: 'GET',
       dataType: 'json',
       success: function(response) {
           pintarDatos(response);
       },
       error: function() {
          console.log("Error de petición al listar usuarios");
       }
   })
};

function pintarDatos(datos){
   let insertar = '';
   insertar += '<thead><tr><th>ID</th><th>Correo</th><th>Contraseña</th><th>Nombre</th></tr></thead></tbody>';


   datos.forEach(dato =>{
      insertar += '<tr>';

      Object.values(dato).forEach(value =>{
         insertar += '<td>'+value+'</td>';
      });
      insertar += '</tr>';


   });

   insertar += '</tbody>';
   document.getElementById('userTable').innerHTML = insertar;

};


