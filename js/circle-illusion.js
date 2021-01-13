window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize () {
    camera.aspect = window.innerWidth / (window.innerHeight*0.6);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight*0.6 );
}

document.getElementById("num").addEventListener("change", function(event){
    event.preventDefault();
    let n = event.target.value;
    init(n);
});

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );

const camera = new THREE.PerspectiveCamera(35,window.innerWidth / (window.innerHeight*0.6), 0.1, 500);
camera.position.set(0,0,50);
scene.add( camera );

const ambientLight = new THREE.AmbientLight();
scene.add( ambientLight );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight*0.6);
document.getElementById("canvas").appendChild(renderer.domElement)

const o_geometry = new THREE.CircleGeometry (9.25, 512);
const o_material = new THREE.MeshBasicMaterial ({color:0x375A7F});
const i_geometry = new THREE.CircleGeometry (0.75, 128);
const i_material = new THREE.MeshBasicMaterial ({color:0xffffff});

const circle = new THREE.Mesh(o_geometry, o_material);
scene.add(circle);

pivot = new THREE.Group();
pivot.position.set(0, 0, 0);
centre = new THREE.Group();
centre.position.set(4,0,0);
pivot.add(centre);
scene.add( pivot );

const l_material = new THREE.LineBasicMaterial({color: 0xf5f5f5, linewidth:5});
lines = new THREE.Group();

init(6);
function init (n){
    centre.remove(...centre.children);

    for(let i = 1; i <= n; i++){
        let vertex = new THREE.Mesh(i_geometry, i_material);
        centre.add(vertex);
        vertex.position.set(4.25*Math.cos(2*i*Math.PI/n),4.25*Math.sin(2*i*Math.PI/n),0);
    }

    lines.remove(...lines.children);

    for(let i = 1; i <= n; i++){
        let points = [];
        points.push( new THREE.Vector3(9.25*Math.cos(i*Math.PI/n), 9.25*Math.sin(i*Math.PI/n), 0 ) );
        points.push( new THREE.Vector3(-9.25*Math.cos(i*Math.PI/n), -9.25*Math.sin(i*Math.PI/n), 0 ) );
        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let line = new THREE.Line( geometry, l_material );
        lines.add( line );
    }
    lines.visible = false;
    scene.add(lines);
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
document.addEventListener( 'mousedown', function( event ) {

    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length>0){
    if( !lines.visible) 
        lines.visible = true;
    else
        lines.visible = false;}
},
false );

function animate(){
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
    pivot.rotation.z += 0.015;
    centre.rotation.z -= 0.03;
}

animate();