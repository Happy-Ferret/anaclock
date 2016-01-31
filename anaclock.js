'use strict';

function anaclock() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  if (h > 12) h -= 12;
  var rad = 0;
  var conf = {
    "hand": {
      "color": {"r": 0, "g": 0, "b": 0}
    },
    "background": {
      "shape": "square",
      "color": {"r": 0,"g": 0,"b": 0}
    }
  };

  chrome.storage.local.get("conf", function(items) {
    try {
      conf = JSON.parse(items["conf"]);
    } catch (e) {}

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "rgb(" + conf.background.color.r + "," + conf.background.color.g + "," + conf.background.color.b + ")";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2, false);
    ctx.fill();

    // Face
    ctx.strokeStyle = "rgb(" + conf.hand.color.r + "," + conf.hand.color.g + "," + conf.hand.color.b + ")";
    ctx.beginPath();
    ctx.moveTo(9, 0);
    ctx.lineTo(9, 1);
    ctx.moveTo(17, 9);
    ctx.lineTo(18, 9);
    ctx.moveTo(9, 17);
    ctx.lineTo(9, 18);
    ctx.moveTo(0, 9);
    ctx.lineTo(1, 9);
    ctx.stroke();

    ctx.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));

    // Short hand
    rad = 2 * Math.PI / 12 * h + 2 * Math.PI / 12 / 60 * m - Math.PI / 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(6 * Math.cos(rad)), Math.ceil(6 * Math.sin(rad)));
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
    ctx.stroke();

    // Long hand
    rad = 2 * Math.PI / 60 * m - Math.PI / 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(8 * Math.cos(rad)), Math.ceil(8 * Math.sin(rad)));
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
    ctx.stroke();

    ctx.restore();

    chrome.browserAction.setIcon({
      "imageData": ctx.getImageData(0, 0, canvas.width, canvas.height)
    });
  });
}
