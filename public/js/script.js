var renderAll = (function(){

		var camera, group, scene, renderer;
			var mesh;
			var mesh2;
			init();
			animate();
			function init() {
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 800;
				scene = new THREE.Scene();
				var texture = new THREE.TextureLoader().load( './imgs/f3a77cfe5e18ffacf003b4766a38037b' );
				var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				var g2 = new THREE.BoxBufferGeometry( 200, 200, 200 , 2);
				var m2 = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(100,100,0);
				mesh2 = new THREE.Mesh( g2, m2 );
				mesh.position.set(200,200,0);
				group = new THREE.Group();
				group.add(  mesh );
				group.add( mesh2 );
				scene.add( group);
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;
				mesh2.rotation.x += 0.005;
				mesh2.rotation.y += 0.01;
				renderer.render( scene, camera );
			}

});

renderAll();