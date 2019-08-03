
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '' })
    .then(function(reg) {
     // registration passed
     console.log('Registration was successful. Scope is ' + reg.scope);
     }).catch(function(error) {
     // registration failed
     console.log('Registration failed with ' + error);
     });
   }