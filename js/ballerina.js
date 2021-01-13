window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize () {
    camera.aspect = window.innerWidth / (window.innerHeight*0.7);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight*0.7 );
}

var state = {base:0.075,yincr:0.075};

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );

const camera = new THREE.PerspectiveCamera(35,window.innerWidth /(window.innerHeight*0.7), 0.1, 1000);
camera.position.set(0,0,575);

const ambientLight = new THREE.AmbientLight();
scene.add( ambientLight );

scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight*0.7);
document.getElementById('canvas').appendChild(renderer.domElement)

var loader = new THREE.OBJLoader();
var materialsLoader = new THREE.MTLLoader();
materialsLoader.setMaterialOptions({side:THREE.DoubleSide});

materialsLoader.load(
    "assets/ballerina.mtl",

    function(materialsCreator){
        loader.setMaterials(materialsCreator);
        loader.load(
            "assets/ballerina.obj",
    
            function (object) {
                ames = object;
                scene.add(object);
                ames.translateY(-120);
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
    renderer.render(scene, camera);
    ames.rotation.y += state.yincr;
}

document.getElementById('speed').addEventListener('change', function (event){
    state.yincr = state.base*event.target.value/4;
},false);

