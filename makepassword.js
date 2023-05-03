//importing things
const fs = require('fs');
const crypto = require('crypto');

//not using md5 as said before
const hash_algo = 'sha256';

//generating our password
function generatePassword(password_file, encrypted_file) {

    //defining the file
    const data = fs.readFileSync(password_file, 'utf8');
    const lines = data.trim().split('\n');
    const encrypted_stream = fs.createWriteStream(encrypted_file);

    //using the examples, splitting it together
    for (let line of lines) {
        const [email, password] = line.split(':');
        const hash = crypto.createHash(hash_algo).update(password).digest('hex');
        encrypted_stream.write(`${email}:${hash}\n`);
    }
    encrypted_stream.end();
}

//basically puts the generation into effect
if (require.main === module) { generatePassword('./password.txt', './password.enc.txt'); }
module.exports = { generatePassword };