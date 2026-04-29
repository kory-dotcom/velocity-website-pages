const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '..', '.cms-users.json');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: npm run add-user -- <username> <password>');
  process.exit(1);
}

const [username, password] = args;

let users = [];
try { users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')); } catch {}

if (users.find(u => u.username === username)) {
  console.log(`User "${username}" already exists. Updating password.`);
  users = users.filter(u => u.username !== username);
}

const hash = bcrypt.hashSync(password, 10);
users.push({ username, hash, createdAt: new Date().toISOString() });

fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
console.log(`User "${username}" saved. ${users.length} total user(s).`);
