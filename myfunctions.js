/*These are extra helper functions*/
/*Finds the next question in branch given the current question index*/
function findrightquestion(selections) {
    i = 0;
    while(!(selections.equals(questions[i].locationintree))) {i++}{return i};//Search for matching element until found, must exist or error
    }

/*Function that checks if question is last in branch*/
function isend(index){
    i=0;
    locationlength=questions[index].locationintree.length
    while(i<questions.length) {
        if ((locationlength+1 == questions[i].locationintree.length)/*Checks that there is one that is long enough*/
            &&
            ((questions[index].locationintree.equals(questions[i].locationintree.slice(0,-1)))))/*Checks that paths are true*/
            {return false;}else{i++;}
    }
    return true}
/*Function that checks if arrays are equal*/
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}


