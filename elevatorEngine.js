var actualFloor = 0;
var toFloor = 0;
var state = "OPEN";


var elevator = {
    
    floor : 0,
    state : "CLOSE",
    commands : [],

    isOpen : function(){
        return this.state == "OPEN";
    },

    addCommand : function(command){
        commands.push(command);
    },

    nextFloor : function(){
        if(commands.length == 0){
            console.log("no command");
            return ;
        }
        var next = commands[0];
        if( (next.floor == this.floor) && this.isOpen()) {
            commands = commands.slice(1); //la commande a été traitée
            next = commands[0];
        }
        console.log("command ", next);
        return next.floor;
    },

    reset : function(){
        floor = 0;
        state = "CLOSE";
        commands = [];        
    }

}

function nextCommand(){
        var nextCommand = "NOTHING";

        console.log("current State ", elevator);

        var toGo = elevator.nextFloor();
        if(!toGo){
            return "NOTHING";   
        }
        var direction = (elevator.floor > toGo) ? "DOWN" : ( (elevator.floor < toGo) ? "UP" : "");


        if((elevator.state == "OPEN") && (direction != "") ){
            elevator.state = "CLOSE";
            nextCommand = "CLOSE";

        }else if( (elevator.state == "CLOSE") && (direction == "") ) {
            elevator.state = "OPEN";
            
            nextCommand = "OPEN";            

        }else if( direction == "UP"){
            //elevator.state = "CLOSE";
            elevator.floor ++;
            nextCommand = "UP";

        }else if( direction == "DOWN"){
            //elevator.state = "CLOSE";
            elevator.floor --;
            nextCommand = "DOWN";

        }else {
            return "NOTHING";
        }


        console.log("elevator state " + elevator.state);
        console.log("elevator floor " + elevator.floor);
        console.log("toFloor " + toFloor);

        
        return nextCommand;
}

function reset(){
    console.log("RESET");
    elevator.reset();
    return "";
}

function call(toFloorCall, to){
    var command = {
        floor : toFloorCall,
        direction : to
    } 

    console.log("CALL : ", command);    
    elevator.addCommand(command);
    toFloor = toFloorCall;
    return "";
}

function go(toGo){
    if(toGo == elevator.floor){
        return "";
    }

    var direction = (elevator.floor > toGo) ? "DOWN" : "UP";
    var command = {
        floor : toGo,
        direction : direction
    }
    elevator.addCommand(command);
    console.log("GO : ", command);    

    toFloor = toGo;
    return "";
}

function userHasEntered(){
    console.log("userHasEntered");
    return "";
}

function userHasExited(){
    console.log("userHasExited");
    return "";
}
exports.nextCommand = nextCommand;
exports.reset = reset;
exports.call = call;
exports.go = go;
exports.userHasEntered = userHasEntered;
exports.userHasExited = userHasExited;
