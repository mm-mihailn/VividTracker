import React, { Component } from 'react';
import './ColorMatrix.css';
import $ from 'jquery'; 

export class ColorMatrix extends Component {
    static displayName = ColorMatrix.name;

    ChangeColor() {
        
        var colorIndex = Math.floor(Math.random() * 8);
        var firstSquareIndex = Math.floor(Math.random() * 161);
        var secondSquareIndex = Math.floor(Math.random() * 161);
        var thirdSquareIndex = Math.floor(Math.random() * 161);
        let squareColor = '#000000';

        switch (colorIndex) {
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

        function ColorSquares(color) {

            let firstSquare = document.getElementsByClassName("squares")[firstSquareIndex];
            let secondSquare = document.getElementsByClassName("squares")[secondSquareIndex];
            let thirdSquare = document.getElementsByClassName("squares")[thirdSquareIndex];

            if (firstSquare !== undefined && secondSquare !== undefined && thirdSquare !== undefined) {
                firstSquare.style.backgroundColor = color;
                secondSquare.style.backgroundColor = color;
                thirdSquare.style.backgroundColor = color;
            }
        }

        ColorSquares(squareColor);
    }

    CreateMatrix = () => {
        $(document).ready(function () {

            for (var i = 0; i < 160; i++) {
                $(".matrix").append(`<p class="squares" ></p>`);
            }

            $(".matrix").css("column-count", "16");
        });
    }

    componentDidMount() {
        this.CreateMatrix()
    }

    render() {

        setInterval(this.ChangeColor, 300)
        return (

            <div className="colorMatrix">

                <div className="matrix">
                </div>

            </div>

        );
    }

}
