//importing our things
const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const { hash } = require("./utilityedited");
hash('sha256');

//generates our password
function passwordGenerator(email, password) {
    const encrypted_file = fs.readFileSync('password.enc.txt', 'utf8');
    const lines = encrypted_file.trim().split('\n');
    //splitting line by line
    let hash = '';
    for (let line of lines) {
        const [stored_email, stored_hash] = line.split(':');
        if (stored_email === email) {
            hash = stored_hash;
            break;
        }
    }
    const password_hash = crypto.createHash(hash_algo).update(password).digest('hex');
    //returning the hashed password
    return (hash === password_hash);
}

const read = readline.createInterface({
    //input and output
    input: process.stdin,
    output: process.stdout
});

//ask the user for the username and password (in the form of the email we gave in password.txt)
read.question('username: ', (username) => {
    read.question('password: ', (password) => {
        const iscorrect = passwordGenerator(username, password);
        console.log(`Password is ${iscorrect ? 'true' : 'false'}.`);
        read.close();
    });
});