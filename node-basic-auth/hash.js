const bcrypt = require('bcryptjs')

const password = '123456'

const salt = '$2a$10$/vMe7cFirPuxxv7Ie98sJu'
console.log(salt)

const hash = bcrypt.hashSync(password, salt)
console.log(hash === '$2a$10$/vMe7cFirPuxxv7Ie98sJu.8d/KnKRIJohgdynKE/O3uaDnx8NMeS')