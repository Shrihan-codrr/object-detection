var my_status = "";
var objects = [];
var width = 0;
var height = 0;
var x = 0;
var y = 0;
var name_ofObj = "";
var level_accuracy = "";

function preload() {
    image_dg_ct = loadImage("Bedroom.jpg");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = " Status : Loading Model..... ";

}
function draw() {

    image(image_dg_ct, 0, 0, 500, 400);

    if (my_status != "") {

        document.getElementById("status").innerHTML = " Status : Detected Objects..... ";
        for(var abc = 0; abc < objects.length; abc++ ) {

            textSize(30);
            stroke("green");
            noFill();
            x = objects[abc].x - 50;
            y = objects[abc].y - 100;
            width = objects[abc].width;
            height = objects[abc].height;
            // rect(x,y,width,height);
            rect(x, y, width, height);
            fill("green");

            name_ofObj = objects[abc].label;
            // 0.98738474  * 100 = 98.738474  = 98.73
            level_accuracy = (objects[abc].confidence * 100).toFixed(2);

            text(name_ofObj + " " + level_accuracy + "%", x, y);
        }



    }


}

function model_loaded() {

    console.log("Model Loaded...🌈🌈🌈");
    document.getElementById("status").innerHTML = " Status : ...Detecting OBJECTS... ";
    objectDetector.detect(image_dg_ct, got_Results);
}

function got_Results(error, results) {

    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        my_status = true;

        objects = results;


    }
}