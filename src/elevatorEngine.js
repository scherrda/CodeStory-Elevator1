if (typeof (console) == 'undefined' || console == null) {
    console = {
        log : function() {
        },
        warn : function() {
        },
        error : function() {
        }
    }
}

var elevator = {
    
    floor : 0,
    state : "CLOSE",
    commands : [],

    isOpen : function(){
        return this.state == "OPEN";
    },


    addCommand : function(command){
       var insertAt = 0;
       if(this.commands.length == 0) {
            this.commands.push(command);
        } else {
            insertAt = this.locationOf(command);
            this.commands.splice( insertAt, 0, command);
        }
        console.log("ADD COMMAND", command);
        console.log("inserted at " + insertAt + " in ", this.commands);
    },


    locationOf : function (command, start, end) {
        start = start || 0;
        end = end || this.commands.length;
        debugger;
        var pivot = parseInt(start + (end - start) / 2);

        if(end-start <= 1){
            return this.commands[pivot].floor > command.floor ? pivot : pivot + 1 ;
        }
        if(this.commands[pivot].floor == command.floor){
            do{
                pivot ++ 
            }while( this.commands[pivot] && (this.commands[pivot].floor == command.floor));
            
            return pivot;  
        }


        if(this.commands[pivot].floor < command.floor) {
            return this.locationOf(command, pivot, end);
        } else{
            return this.locationOf(command, start, pivot);
        }
    },  

    changeState : function(state){
        switch(state){
            case "OPEN":
                this.state = "OPEN";
                break;
            case "UP" :
                this.floor++;
                this.state = "UP";
                break ;
            case "DOWN":
                this.floor--;
                this.state = "DOWN";
                break;
            case "CLOSE":
                this.state = "CLOSE";
                break;
            default :
                break;
        }
    },


    nextFloor : function(){
        if(this.commands.length == 0){
            return ;
        }
        var next = this.commands[0];
        if( (next.floor == this.floor) && this.isOpen()) {
            this.commands = this.commands.slice(1); //la commande a été traitée
            next = this.commands[0];
        }
        return next.floor;
    },


    reset : function(){
        floor = 0;
        state = "CLOSE";
        this.commands = [];        
    }
}

function nextStep(){
        var nextStep = "NOTHING";

        console.log("Actual State : ", elevator.floor + "e " + elevator.state);

        var toGo = elevator.nextFloor();
        var move = (elevator.floor > toGo) ? "DOWN" : ( (elevator.floor < toGo) ? "UP" : "STOP");

        if(elevator.isOpen()){
            if((move == "STOP")){
                nextStep = "NOTHING";
            }else{
                nextStep = "CLOSE";
            }
        }else if(move == "STOP"){
                nextStep = "OPEN";
        }else{
                nextStep = move;
        }

        elevator.changeState(nextStep);
        console.log("New State : ", elevator.floor + "e " + elevator.state );
        return nextStep;
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
exports.nextCommand = nextStep;
exports.reset = reset;
exports.call = call;
exports.go = go;
exports.userHasEntered = userHasEntered;
exports.userHasExited = userHasExited;
