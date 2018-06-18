// send user info to API
$( "#login" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( $( this ).serialize() );
  });
// validate

let login = (user, pw) => {
  if (!user) {
       let user = lsh.get('user');
       if(!user) {
           return false;
       }
   }
}

// route
