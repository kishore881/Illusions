window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize () {
    camera.aspect = window.innerWidth / (window.innerHeight*0.7);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight*0.7 );
}

var state = {base:0.004,yincr:0.004};

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x222222 );
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight*0.6);
        document.getElementById('canvas').appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(35,window.innerWidth /(0.6*window.innerHeight), 0.1, 1000);
        const controls = new THREE.OrbitControls( camera, renderer.domElement );
        camera.position.set(0,0,450);
        controls.update();
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
		scene.add( ambientLight );
		
		scene.add( camera );
        

        var loader = new THREE.OBJLoader();
        var materialsLoader = new THREE.MTLLoader();
        materialsLoader.setMaterialOptions({side:THREE.DoubleSide});

        materialsLoader.load(
            "assets/Ames Window.mtl",
        
            function(materialsCreator){
                loader.setMaterials(materialsCreator);
                loader.load(
                    "assets/Ames Window.obj",
            
                    function (object) {
                        ames = object;
                        scene.add(object);
                        ames.translateY(-45);
                        animate();
                    },

                    function (xhr) {
                        console.log((xhr.loaded/xhr.total *100 + '% object loaded'));
                        
                    },

                    function (error) {
                        console.log(error);
                    }
                );
            },
            
            function (xhr) {
                console.log((xhr.loaded/xhr.total *100 + '% material loaded'));
            },

            function (error) {
                console.log(error);
            }
        );

        function animate(){
            requestAnimationFrame( animate );
            controls.update();
            ames.rotation.y += state.yincr;
            renderer.render(scene, camera);
        }

        document.getElementById('speed').addEventListener('change', function (event){
            state.yincr = state.base*event.target.value/4;
        },false);

        function control(){
            camera.position.set(0,0,450);
            state.yincr = state.base;
            document.getElementById('speed').value = 4;
        }
