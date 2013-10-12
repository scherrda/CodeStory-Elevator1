var actualFloor = 0;
var toFloor = 0;
var isOpen = false;

function nextCommand(){
        if(isOpen & actualFloor != toFloor){
            isOpen = false;
            return "CLOSE";
        }else if(actualFloor < toFloor){
            actualFloor ++;
            return "UP";
        } else if (actualFloor > toFloor) {
            actualFloor --;
            return "DOWN";
        } else if (actualFloor == toFloor) {
            if(!isOpen){
                isOpen = true;
                return "OPEN";
            }
        }
    return "NOTHING";
}

function reset(){
    actualFloor = 0;
    toFloor = 0;
    isOpen = false;    
    return "";
}

function call(toFloorCall, to){
    toFloor = toFloorCall;
    return "";
}

function go(toGo){
    toFloor = toGo;
    return "";
}

function userHasEntered(){
    return "";
}

function userHasExited(){
    return "";
}
exports.nextCommand = nextCommand;
exports.reset = reset;
exports.call = call;
exports.go = go;
exports.userHasEntered = userHasEntered;
exports.userHasExited = userHasExited;
