

// The detector will show a warning if the current browser does not support WebGL.
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

// All of these variables will be needed later, just ignore them for now.
var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var texture;

init();
render();

function init() {
    container = document.getElementById('product3d-1');
    
    // Camera
    camera = new THREE.PerspectiveCamera(45, 1.0, 1, 1000);
    camera.position.z = 150;
    camera.position.x = 150;
    camera.position.y = 150;
    camera.zoom = -10;

    // Scene
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    // Lights
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    texLoader = new THREE.TextureLoader();
    texLoader.setPath('./assets/');
    texture = texLoader.load( "product3d-1/tex/Nuage_texture_03.jpg" );
    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set( 4, 4 );

    // Model and material
    var mtlLoader = new THREE.MTLLoader();
    //mtlLoader.setBaseUrl('./assets/');
    mtlLoader.setPath('./assets/');
    mtlLoader.setTexturePath('./product3d-1/tex/');
    mtlLoader.load('product3d-1/Model_01.mtl', function (materials) {

        materials.preload();

        // materials.materials.default.map.magFilter = THREE.NearestFilter;
        // materials.materials.default.map.minFilter = THREE.LinearFilter;

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./assets/');
        objLoader.load('product3d-1/Model_01.obj', function (object) {

            object.traverse(function(child) {

                if (child instanceof THREE.Mesh) {
          
                  child.material.map = texture;
          
                }
          
              });

            scene.add(object);

        });

    });

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    //Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

