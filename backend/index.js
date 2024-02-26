const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors);



app.post('/byFile',(req,res)=>{
    console.log(req);
    res.send({
        "success" : 1,
        "file" : {
            'url' : "https://upload.wikimedia.org/wikipedia/commons/a/a8/TEIDE.JPG"        
        }
    })
})

app.listen(3700, ()=>{
    console.log("Server running hai ji, 3700 port vich");
})