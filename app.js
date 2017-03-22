
'use strict';

const express = require('express');

const app = express();
var path = require('path');

var fs = require('fs');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/webfiles/index.html'));
    
});
app.get('/web/js/*',function(req,res){
    var requestedUrl = req.originalUrl;
    var jsFilePath = requestedUrl.split('/web/js')[1];
    var fullfilepath = path.join(__dirname + '/webfiles/web/js' + jsFilePath);
    if (fs.existsSync(fullfilepath)) {
        res.sendFile(fullfilepath)
    } 

});
app.get('/web/probe/up.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/webfiles/web/probe/up.html'));
});





if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
