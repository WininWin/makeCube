const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
//const sizeOf   =  require( 'image-size' );
const fs = require('fs');
require( 'string.prototype.startswith' );

const upload = multer({ dest: __dirname + '/public/imgs/' });

const app = express();




app.set('port', (process.env.PORT || 3001));
app.use(express.static('public/'));


app.listen(app.get('port'));
console.log('Server running on port ' + app.get('port'));

//get list of the images
app.get('/getimgs', function(req, res){
      let imglist = fs.readdirSync('./public/imgs/');

      return res.status(200).send(imglist); 


});


//upload 
app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {

  //file check
  if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    let filepath =  __dirname + "/public/imgs/" + req.file.filename;
    fs.unlinkSync(filepath);
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }
  return res.status( 200 ).send( req.file );
});


