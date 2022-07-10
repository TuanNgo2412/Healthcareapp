const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    // Load hash from your password DB.
    console.log(hash)
    bcrypt.compare(myPlaintextPassword, hash).then(function (result) {
        console.log(result)
    });
});
// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//     // result == false
// });
