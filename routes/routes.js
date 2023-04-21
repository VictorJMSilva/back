const express = require('express');
const { deleteMany } = require('../models/tarefa');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');

router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    })
    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

router.get('/getAll', async (req, res) => {
    try {
        const resultados = await modeloTarefa.find();
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const resultado = await modeloTarefa.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novaTarefa = req.body;
        const options = { new: true };
        const result = await modeloTarefa.findByIdAndUpdate(
            id, novaTarefa, options
        )
        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/Tarefas/search', async (req, res) => {
    const { descricao } = req.query;
    try {
        const resultados = await modeloTarefa.find({ descricao: new RegExp(descricao, 'i') });
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/Tarefas/remover', async (req, res) => {
    try {
        await modeloTarefa.deleteMany({})
        res.send({ message: "Apagou!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/Tarefas/removeFeitas', async (req, res) => {
    try {
        await modeloTarefa.deleteMany({ statusRealizada: true })
        res.send({ message: "ApagouTudo!" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})