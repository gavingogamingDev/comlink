var express = require('express');
var bodyparse = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
var app = express();

app.use(bodyparse.json());
app.use(express.static(__dirname + '/public'));

app.use('/post', (req, res) => {
    var messageTitle = req.body.title;
    var messageBody = req.body.content;
    var messageAuthor = req.body.author;
    var origin = JSON.parse(readFileSync("chats.json", {encoding: 'utf-8'}));
    origin.push({
        title: messageTitle,
        content: messageBody,
        author: messageAuthor
    });
    writeFileSync("chats.json", JSON.stringify(origin, null, " "), {encoding: 'utf-8'});
    res.json({status: 'Completed', error: false});
});
app.use('/list', (req, res)=> {
    var content = readFileSync('chats.json', {encoding:'utf-8'});
    var json = JSON.parse(content);
    res.json(json);
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Express Hosted');
})