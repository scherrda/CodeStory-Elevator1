var elevator = {
    
    floor : 0,
    doors : "CLOSE",
    move : "STOP",
    commands : [],

    isOpen : function(){
        return this.doors == "OPEN";
    },


    addCommand : function(command){
       // commands.push(command);
        if( (commands.length == 0) || (this.afterNext(command) ) ){
            commands.push(command);    
        }else{
            console.log("will be the next command ", command);
            commands.unshift(command);//should be treated before next one
        }
        
    },

    changeState : function(state){
            console.log("CHANGING STATE ", state);

        switch(state){
            case "STOP":
                this.doors = "OPEN";
                this.move = "STOP";
                break;
            case "UP" :
                this.floor++;
                this.move = "UP";
                break;
            case "DOWN":
                this.floor--;
                this.move = "DOWN";
                break;
            case "CLOSE":
                this.doors = "CLOSE";
                break;
            default :
            break;

        }
    },


    afterNext : function(command){
        
        var next = commands[0] ;
        console.log("compare next comma ds");
        console.log("next ", next);
        console.log("new command ", command);
        console.log("state " + this.move + " " + this.doors);
        if( (this.floor < next.floor < command.floor) && ( this.move != "DOWN") ){
            return true ;
        }
        if( (this.floor > next.floor > command.floor) && ( this.move == "DOWN") ){
            return true ;
        }

        return false;
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

    moveUp : function(){
        floor++;
        move = "UP";
    },

    moveDown : function(){
        floor--;
        move = "DOWN";
    },


    reset : function(){
        floor = 0;
        doors = "CLOSE";
        move = "STOP";
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


        if((elevator.doors == "OPEN") && (direction != "") ){
            elevator.changeState("CLOSE");
            nextCommand = "CLOSE";

        }else if( (elevator.doors == "CLOSE") && (direction == "") ) {
            elevator.changeState("STOP");

            //elevator.doors = "OPEN";
            
            nextCommand = "OPEN";            

        }else if( direction == "UP"){
            elevator.changeState("UP");
            nextCommand = "UP";

        }else if( direction == "DOWN"){
            elevator.changeState("DOWN");
            nextCommand = "DOWN";

        }else {
            return "NOTHING";
        }


        console.log("elevator doors " + elevator.doors);
        console.log("elevator floor " + elevator.floor);
        console.log("toFloor " + toGo);

        console.log("Next command will be " + nextCommand);
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
