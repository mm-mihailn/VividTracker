import $ from 'jquery'; 

setInterval(ChangeColor, 300);

function ChangeColor() {
    var index = Math.floor(Math.random() * 8);
    var newIndex = Math.floor(Math.random() * 161);
    var newIndex1 = Math.floor(Math.random() * 161);
    var newIndex2 = Math.floor(Math.random() * 161);
    var squareColor = "";

    switch (index) {
        case 0:
            squareColor = '#D9D9D9'
        break;
        case 1:
            squareColor = '#F03C31'
        break;
        case 2:
            squareColor = '#EEDC3A'
        break;
        case 3:
            squareColor = '#51FF4E'
        break;
        case 4:
            squareColor = '#0239FB'
        break;
        case 5:
            squareColor = '#708FFF'
        break;
        case 6:
            squareColor = '#D2DCFF'
        break;
        case 7:
            squareColor = '#9CB2FF'
        break;
    }


    function ColorSquares() {
        var value = document.getElementsByClassName("square")[newIndex];
        var value1 = document.getElementsByClassName("square")[newIndex1];
        var value2 = document.getElementsByClassName("square")[newIndex2];

        value.style.background = squareColor;
        value1.style.background = squareColor;
        value2.style.background = squareColor;
    }
    ColorSquares();
}

$(document).ready(function () {

    for (var i = 0; i < 160; i++) {
        $(".firstColumn").append(`<p class="square"></p>`);
    }

    $(".firstColumn").css("column-count", "16");
});