const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    const person = { name, salary, approved }

    if (!name) {
        res.status(422).json({error: 'Name is required.'})
        return
    }

    if (!salary) {
        res.status(422).json({error: 'Salary is required.'})
        return
    }

    try {
        await Person.create(person)

        res.status(201).json({ message: 'Person created successfully.' })
    } catch (err) {
        res.status(500).json({ error: 'Could not create person.' })
    }

})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(404).json({message: 'Person not found.'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved } = req.body
    const person = {name, salary, approved}

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(404).json({message: 'Person not found.'})
            return
        }

        res.status(200).json({data: person})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(404).json({message: 'Person not found.'})
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(204)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router