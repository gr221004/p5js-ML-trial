// #region Type imports and JS settings
// Please don't change this code! It enables the autocomplete.
/// <reference path="node_modules/@types/p5/global.d.ts" />
/// <reference path="types/ml5.d.ts" />
"use strict";
// #endregion Type imports and JS settings


var circles = [];
var squares = [];
var triangles = [];

function preload() {
  //load in images from the data folder
  for (let i = 0; i < 30; i++) {
    let index = nf(i + 1, 4, 0);
    circles.push(loadImage("data/circle" + index + ".png"));
    squares.push(loadImage("data/square" + index + ".png"));
    triangles.push(loadImage("data/triangle" + index + ".png"));
  };

}

let shapeClassifier;

function setup() {
  createCanvas(500, 500);

  let options = {
    inputs: [100, 100, 4],
    task: "imageClassification",
    debug: true,
  };

  shapeClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({image: circles[i]}, {label: "circle"});
    shapeClassifier.addData({image: triangles[i]}, {label: "triangle"});
    shapeClassifier.addData({image: squares[i]}, {label: "square"});
  };
  shapeClassifier.normalizeData();
  shapeClassifier.train({epochs: 50}, finishedTraining());

}

function finishedTraining() {
  text("Finished Training!", 0, 0);
}

function draw() {


}

