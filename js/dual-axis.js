window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize () {
    camera.aspect = window.innerWidth / (window.innerHeight*0.6);
    camera.left = window.innerWidth / - 10;
    camera.right =  window.innerWidth / 10;
    camera.top = window.innerHeight*0.6 / 10;
    camera.bottom =  window.innerHeight*0.6 / - 10;
    camera.near =  Math.min(-4000,window.innerWidth*0.6 /- 10);
    camera.far =  Math.max(1000,window.innerWidth*0.6 / 10);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight*0.6 );
}

var state = {base:0.004,yincr:0.004};

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x222222 );
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight*0.6);
        document.getElementById('canvas').appendChild(renderer.domElement);

        const camera = new THREE.OrthographicCamera( window.innerWidth / - 10, window.innerWidth / 10, window.innerHeight*0.6 / 10, window.innerHeight*0.6 / - 10,  window.innerWidth / - 10,  window.innerWidth*0.6 / 10 );

        
        const ambientLight = new THREE.AmbientLight();
		scene.add( ambientLight );
		
		scene.add( camera );
        

        var loader = new THREE.OBJLoader();
        var materialsLoader = new THREE.MTLLoader();
        materialsLoader.setMaterialOptions({side:THREE.DoubleSide});

        materialsLoader.load(
            "assets/dual-axis.mtl",
        
            function(materialsCreator){
                loader.setMaterials(materialsCreator);
                loader.load(
                    "assets/dual-axis.obj",
            
                    function (object) {
                        ames = object;
                        scene.add(object);
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
            ames.rotation.y += state.yincr;
            renderer.render(scene, camera);
        }

        document.getElementById('speed').addEventListener('change', function (event){
            state.yincr = state.base*event.target.value/4;
        },false);
