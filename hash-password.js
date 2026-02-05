const bcrypt = require('bcryptjs');

const password = 'Test@123456';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Hashed password:', hashedPassword);
console.log('\nTo update in MongoDB, run:');
console.log(`db.users.updateOne({ email: "admin@dentalini.com" }, { $set: { password: "${hashedPassword}" } })`);
