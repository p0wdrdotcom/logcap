var cv = require('opencv');

cv.readImage("./logs.jpg", function(err, im) {
    var color = im.copy();
    im.gaussianBlur([5,5]);
    im.convertGrayscale();
    var circles = im.houghCircles(1.2, 22, 23, 68, 18, 60);

    circles.map(function(circle) {
        return {
            x: circle[0],
            y: circle[1],
            radius: circle[2]
        }
    }).forEach(function(circle) {
        color.ellipse(circle.x,
            circle.y,
            circle.radius,
            circle.radius);
    });
    color.save('out.jpg');
});