const canvas = document.getElementById("renderCanvas"); // Get the canvas element

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
  // Creates a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  // Creates and positions a free camera
  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 4,
    Math.PI / 3,
    12,
    BABYLON.Vector3.Zero(),
    scene
  );

  // Targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Creates a light, aiming 0,1,0 - to the sky
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // Dim the light a small amount - 0 to 1
  light.intensity = 0.7;

  const floor = BABYLON.MeshBuilder.CreateBox(
    "floor",
    {
      height: 0.01,
      width: 1000,
      depth: 1000,
    },
    scene
  );
  floor.position = new BABYLON.Vector3(0, -1.1, 0);

  BABYLON.SceneLoader.ImportMesh(
    "aircraft",
    "https://cdn.thingiverse.com/assets/53/fe/64/c9/57/F-22_Raptor.stl?ofn=Ri0yMl9SYXB0b3Iuc3Rs",
    "",
    scene,
    ([aircraft]) => {
      // write code here
      aircraft.translate(BABYLON.Axis.X, 100);
      aircraft.computeWorldMatrix();
      aircraft.scaling = new BABYLON.Vector3(0.02,0.02,0.02)
      aircraft.showBoundingBox = true;

      camera.setTarget(aircraft.getAbsolutePosiiton());
    },
    "stl"
  );

  BABYLON.SceneLoader.ImportMesh(
    "aircraftCarrier",
    "https://cdn.thingiverse.com/assets/2b/da/17/ce/a2/aircraft_carrer_2.stl?ofn=YWlyY3JhZnRfY2FycmVyXzIuc3Rs",
    "",
    scene,
    ([aircraftCarrier]) => {
      aircraftCarrier.showBoundingBox = true;

      scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              case "w":
                aircraftCarrier.translate(BABYLON.Axis.X, -3);
                break;
              case "a":
                aircraftCarrier.rotate(BABYLON.Axis.Y, 0.00872665);
                break;
              case "s":
                aircraftCarrier.translate(BABYLON.Axis.X, 3);
                break;
              case "d":
                aircraftCarrier.rotate(BABYLON.Axis.Y, -0.00872665);
                break;
            }
            break;
        }

        aircraftCarrier.computeWorldMatrix(true);
        camera.setTarget(aircraftCarrier.position);
      });
    },
    "stl"
  );

  BABYLON.SceneLoader.ImportMesh(
    "beep",
    "https://cdn.thingiverse.com/assets/2f/ef/34/33/8d/floating_submarine.stl?ofn=ZmxvYXRpbmdfc3VibWFyaW5lLnN0bA==",
    "",
    scene,
    ([submarine]) => {
      
      scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              case "i":
                submarine.position.x -= 5;
                break;
              case "j":
                submarine.rotate(BABYLON.Axis.Y, 0.00872665);
                break;
              case "k":
                submarine.position.x += 5;
                break;
              case "l":
                submarine.rotate(BABYLON.Axis.Y, -0.00872665);
                break;
            }
            break;
        }
      });

      // write code here
      submarine.rotate(BABYLON.Axis.Z, Math.PI * 0);
      submarine.rotate(BABYLON.Axis.X, Math.PI * 0);
      submarine.rotate(BABYLON.Axis.Y, Math.PI * 0);

      submarine.translate(BABYLON.Axis.X, 500);
      submarine.computeWorldMatrix();

      submarine.showBoundingBox = true;

      camera.setTarget(submarine.getAbsolutePosiiton());
    },
    "stl"
  );

  return scene;
};

const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
