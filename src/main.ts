import express from 'express';

const app = express();


app.get("/", (req, res ) => {
    res.send(sayName('Suprasanna'));
})

const sayName = (name: string) : string => {
    return `The name : ${name}`;
}

app.listen(3000);
