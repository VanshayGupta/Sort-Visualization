import React, { Component } from 'react';
import './SortVisualizer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class SortVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array= [];
        for(let i=0;i<10;i++) {
            array.push(Math.floor((Math.random()*20)+1));
        }
        this.setState({
            array: array,
        });
    }

    setPauses=(time) => new Promise ((resolve) =>
        setTimeout(resolve, time)
    );

    async bubbleSort() {
        var sortedArray=[]; 
        sortedArray= this.state.array;
        let bar= document.getElementsByClassName("array-bar");
        for(let i=0; i<sortedArray.length;i++) {
            await this.setPauses(100);
            for(let j=0;j<sortedArray.length-i-1;j++) {
                await this.setPauses(500);
                 if(sortedArray[j+1]<sortedArray[j])
                {
                    bar[j].style.backgroundColor="red";
                    bar[j+1].style.backgroundColor="red";
                    setTimeout(()=>{
                        let temp=sortedArray[j+1];
                        sortedArray[j+1]=sortedArray[j];
                        sortedArray[j]=temp;
                    }, 40);
                }
                setTimeout(()=>{
                    bar[j].style.backgroundColor="white";
                    bar[j+1].style.backgroundColor="white";
                    bar[sortedArray.length-i-1].style.backgroundColor="green";
                }, 100);
                this.setState({
                    array: sortedArray,
                });     
            }
        }
        setTimeout(() => {
            bar[0].style.backgroundColor="green";
        }, 100);
    };

    render() {
        const {array}= this.state;
        return (
            <div class="array-container">
                <h1>BUBBLE SORT VISUALIZATION</h1>
                { 
                    array.map((value, id) =>  (
                    <div class="array-bar" key={id} style={{height: `${value*20}px`}}>
                    </div>
                    ))
                } <p></p>
                <button id="sort" class="btn btn-primary" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button id="reset" class="btn btn-primary" onClick={() => this.resetArray()}>Reset</button>
            </div>
        );
    }
}

export default SortVisualizer;