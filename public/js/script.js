
	/* Dropzone */
	//Dropzone setting
	Dropzone.autoDiscover = false;

	var myDropzone = new Dropzone("#upload-image", {
		url: '/upload',
	  paramName: 'file',
	  maxFilesize: 2, // MB
	  maxFiles: 1,
	  dictDefaultMessage: 'Drag an image here to upload, or click to select one',
	  addRemoveLinks : true,
	  headers: {
	    'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
	  },
	  acceptedFiles: 'image/*',
	autoProcessQueue: false,
	//on upload
  init: function() {
    this.on('success', function( file, resp ){

    	addCube(resp.filename, currObjectXPosition, currObjectYPosition);
     	controlObjectPosition();
    });

    this.on('error',function(file, resp){
    	console.log(file);
    	console.log(resp);
    });
    this.on('thumbnail', function(file) {
     
        file.acceptDimensions();
      
    });
  },
  accept: function(file, done) {
    file.acceptDimensions = done;
   
  }
});

	$('#makeCube').click(function(){           
	  myDropzone.processQueue();
	});
	

	/* Global */
	var camera, scene, renderer;
	var meshes = []; 
	var imgs = []; 
	var objectCounts; 
	var currObjectXPosition = -(window.innerWidth/2);
	var currObjectYPosition = 400; 
	var currZoom = 800; 
	var cubeSize = 100; 


	//init Threejs 
	init();
	animate();
	//Scene update after geting textures 
	fetch('/getimgs')
	  .then(function(response) {
	    return response.json();

	  })
	  .then(function(imglists) {
	     	imgs = imglists;	
	     	
	     	for(let i = 0; i < imgs.length;i++){
	     		addCube(imgs[i], currObjectXPosition, currObjectYPosition);
	     		controlObjectPosition();
	     	}
	  });

	function controlObjectPosition(){
		currObjectXPosition += (cubeSize*1.5);
		if(currObjectXPosition > (window.innerWidth/2)){
			currObjectXPosition =  -(window.innerWidth/2);
			currObjectYPosition -= (cubeSize*1.5); 
		}
	}

	/*ThreeJS addCube to scene */ 
	function addCube(texture, x, y){


      	var texture = new THREE.TextureLoader().load( './imgs/' + texture );

         var geometry = new THREE.CubeGeometry( cubeSize , cubeSize, cubeSize);

         var material = new THREE.MeshBasicMaterial( { map: texture } );
		
		var mtmp = new THREE.Mesh( geometry, material );
        
        mtmp.position.set(x,y,0);

        meshes.push( mtmp );

        //scene is global
   		scene.add(mtmp);
        
         
      }

      /*Threejs Init*/ 
	function init() {
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = currZoom;
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xffffff );
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		$("#render-container").append( renderer.domElement );
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	/*Start animation */ 
	function animate() {
		requestAnimationFrame( animate );
		 for (let i = 0; i < meshes.length; i++) {
      
            meshes[i].rotation.x += 0.005;
			 meshes[i].rotation.y += 0.01;
          }
  
		renderer.render( scene, camera );
	}
	