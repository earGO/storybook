const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Server up and running for Storybook')
})

app.listen(port,()=>{
    console.log(`Storybook App is up on port ${port}`)
})