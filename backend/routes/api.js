import express from "express";

const router = express.Router();

router.get('/', function(req, res){
    res.json({
        "title": "hello world"
    })
});

export default router