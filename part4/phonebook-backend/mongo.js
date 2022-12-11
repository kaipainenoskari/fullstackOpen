/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://soppakulho:${password}@cluster0.9wzkpox.mongodb.net/noteApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    mongoose.connect(url).then(() => {
        console.log('phonebook:')
        Person.find({}).then(persons => {
            persons.forEach(pers => {
                console.log(pers.name, pers.number)
            })
            mongoose.connection.close()
        })
    })
}

else if (process.argv.length === 5) {
    mongoose
        .connect(url)
        .then(() => {
            const pers = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })
            console.log(`added ${pers.name} number ${pers.number} to phonebook`)
            return pers.save()
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}
else {
    console.log('Please provide the correct amount of arguments (3 || 5)')
    console.log(process.argv.length)
    process.exit(1)
}
