/*
Project Summary:
The project is to write a web program in node.js 
that allows someone to upload an image. 
Then, we want you to use webgl to create 
some effect with the image and display 
this in a webgl (e.g. three.js) window. 
Someone else can then go to the website and see the image and effect.

Breakdown of Tasks:
To restate, the program should have the following functionality:
1) accessible via web interface
2) implemented at least partially using node.js
3) user can upload an image
4) some effect has been done to the image and the result is displayed with webgl
5) the image is saved so that someone else can see the image by going to the site.

Deliverable:
1. Run the code on a website that we can access if you can; otherwise, we can run locally.
2. Send the code as a zip, or a github link

Example:
A simple example of "some effect" is to 3D rotate the image as an animation. 
*/

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sizeOf   =  require( 'image-size' );
require( 'string.prototype.startswith' );

const upload = multer({ dest: __dirname + '/public/imgs/' });

const app = express();



app.set('port', (process.env.PORT || 3001));
app.use(express.static('public/'));


app.listen(app.get('port'));
console.log('Server running on port ' + app.get('port'));


app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {

  if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

  var dimensions = sizeOf( req.file.path );

  if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
    return res.status( 422 ).json( {
      error : 'The image must be at least 640 x 480px'
    } );
  }

  return res.status( 200 ).send( req.file );
});


