

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
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;
    camera.zoom = 1;

    // Scene
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    // Lights
    keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(10, 10, -2);
    keyLight.castShadow = true;
    //keyLight.shadowCameraVisible = true;



    fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(20, 10, 10);

    backLight = new THREE.DirectionalLight(0xffffff, 0.75);
    backLight.position.set(0, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    texLoader = new THREE.TextureLoader();
    texLoader.setPath('./assets/');
    //texture = texLoader.load( "product3d-1/tex/Nuage_texture_03.jpg" );
    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set( 4, 4 );

    // Model and material
    var mtlLoader = new THREE.MTLLoader();
    //mtlLoader.setBaseUrl('./assets/');
    mtlLoader.setPath('./assets/product3d-1/');
    //mtlLoader.setTexturePath('./product3d-1/');

    // uniforms
    var uniforms = {
        color: { type: "c", value: new THREE.Color( 0xffffff ) },
        texture: { type: "t", value: texture },
    };
    // custom shader material to work with transparent PNG
    var shMaterial = new THREE.ShaderMaterial({
        uniforms        : uniforms,
        vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
        fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
    });

    mtlLoader.load('OBJ_01.mtl', function (materials) {

        materials.preload();

        var matArray = materials.getAsArray();
        //matArray.push(shMaterial);

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./assets/product3d-1/');
        objLoader.load('OBJ_01.obj', function (object) {

            object.traverse(function(child) {

                if (child instanceof THREE.Mesh) {
                    
                    child.material.blending = THREE.CustomBlending;
                    //THREE.NormalBlending
                    //THREE.AdditiveBlending
                    //THREE.SubtractiveBlending
                    //THREE.MultiplyBlending
                    //THREE.CustomBlending
                    //child.material.transparent = false;
                    //child.material.opacity = 0.5;
                }
        
            });
            //object.material = shMaterial;
            object.castShadow = true;
            object.receiveShadow = true;
            //object.transparent = true;
            console.log(object);
            camera.lookAt(object.position.x,object.position.y,object.position.x);
            scene.add(object);
        });

    });

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


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

