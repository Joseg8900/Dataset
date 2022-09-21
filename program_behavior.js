/*
Date: June 2, 2022
Name: Jose Guzman-Vargas
File: program_behavior.js
Summary:
    This file takes the dataset array from earlier and
    takes certain elements from the array to display and
    gathers interesting facts in the dataset. This file
    also holds a function 'numFormat' that changes all
    the numbers into a USD currency format.
 */
//get access to our buttons
let previous = document.getElementById("previous");
let next = document.getElementById("next");

//the index of the current object shown
//on the web page
let index = 0;
display();

//responds to clicks of the "previous" button
previous.onclick = function(event) {

    //make sure that index is never less than zero...

    if(index < 0){
        return;
    }else{
        index--;
        display();
    }

}

//responds to clicks of the "next" button
next.onclick = function(event) {

    //make sure that index is never greater than
    //array.length - 1

    if(index > states.length-1){
        return;
    }else{
        index++;
        display();
    }
}

//shows the current record in the array of records
//at the position within the index variable
function display()
{
    let stateData = states[index];
    facts();

    document.getElementById("dataset").textContent = "There are "+states.length+" elements in this dataset!";
    document.getElementById("state").textContent = stateData["State"];
    document.getElementById("year").textContent = stateData["Year"];
    document.getElementById("rev").textContent = numFormat(stateData["Totals"]["Revenue"]).join('');
    document.getElementById("spend").textContent = numFormat(stateData["Totals"]["Expenditure"]).join('');
    document.getElementById("tax").textContent = numFormat(stateData["Totals"]["Tax"]).join('');
    document.getElementById("debt").textContent = numFormat(stateData["Totals"][" Debt at end of fiscal year"]).join('');



    console.log("Next index is " + index);
}

function facts(){

    let sum = 0;
    let avg = 0;
    let max = 0;
    let expState = '';

    for(let i = 0; i < states.length; i++){

        sum += states[i]["Totals"]["Revenue"];
        avg += states[i]["Totals"][" Debt at end of fiscal year"];
        if( states[i]["Totals"]["Tax"] > max){
            max = states[i]["Totals"]["Tax"];
            expState = states[i]["State"];
        }

    }
    avg = avg/states.length;

    document.getElementById("revSum").textContent = "The Sum of all Revenue totaled "+numFormat(sum).join('')
        +"!";
    document.getElementById("avgDebt").textContent = "The Average Debt of each state is about~ "+
        numFormat(Math.round(avg)).join('');
    document.getElementById("maxTax").textContent = expState+" had the highest tax of every state! " +
        "With a Max Tax of "+numFormat(max).join('');
}

function numFormat(nums){

    let format = nums.toString();
    output = [];
    output.push("$");
    for(let i = 0; i < format.length; i++){

        if( (format.length-i)%3 === 0 && i !== 0){
            output.push(",");
            output.push( format.charAt(i));

        }else{
            output.push( format.charAt(i));
        }

    }
    return output;

}