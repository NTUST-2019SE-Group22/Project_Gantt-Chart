function imageOutput()
{
    var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);
    var png, jpeg;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        png = canvas.toDataURL("image/png");
        jpeg = canvas.toDataURL("image/jpeg");
        $("#downloadJPG").attr("href", jpeg);
        $("#downloadPNG").attr("href", png);
        DOMURL.revokeObjectURL(png);
        DOMURL.revokeObjectURL(jpeg);
    };
    img.src = url;

    $("#downloadSVG").attr("href", url); 
}
