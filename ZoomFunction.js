function setZoom(zoom,el) {
      
    transformOrigin = [0.5,0.5];
      el = el || instance.getContainer();
      var p = ["webkit", "moz", "ms", "o"],
          s = "scale(" + zoom + ")",
          oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

      for (var i = 0; i < p.length; i++) {
          el.style[p[i] + "Transform"] = s;
          el.style[p[i] + "TransformOrigin"] = oString;
      }

      el.style["transform"] = s;
      el.style["transformOrigin"] = oString;
    
}

//setZoom(5,document.getElementsByClassName('container')[0]);

function showVal(a){
 var zoomScale = Number(a)/10;
 setZoom(zoomScale,document.getElementsByClassName('grid-item')[0])
 setZoom(zoomScale,document.getElementsByClassName('plot-chord')[0])


}