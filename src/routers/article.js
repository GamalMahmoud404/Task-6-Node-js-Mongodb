const express = require('express')
const Article = require('../models/article')
const auth = require ("../middleware/auth")
const router = express.Router()


// post 

router.post('/article',auth,async(req,res)=>{
    try{
        const article = new Article({...req.body , owner : req.user._id })
        await article.save()
        res.status(200).send(article)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

// get all

router.get('/article',auth,async(req,res)=>{
    try{
        const articles = await Article.find({})
        res.status(200).send(articles)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

// get by id

router.get('/article/:id',auth,async(req,res)=>{
    try{
        const id = req.params.id
        const article = await Article.findOne({_id:id , owner : req.user._id})
        if(!article){
          return  res.status(404).send("This article cannot be displayed")
        }
        res.send(article)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

// patch

router.patch('/article/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id
        const article = await Article.findByIdAndUpdate({_id},req.body,{
            new:true,
            runvalidators:true
        })
        if(!article){
            return res.status(404).send('No article')
        }
        res.status(200).send(article)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

//delete

router.delete('/article/:id',auth,async(req,res)=>{
    try{
        const article = await Article.findByIdAndDelete(req.params.id)
        if(!article){
            res.status(404).send('No article is found')
        }
        res.status(200).send(article)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = router 