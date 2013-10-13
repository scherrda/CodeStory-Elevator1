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
    doors : "CLOSE",
    move : "STOP",
    commands : [],
    allFloors :[6],

    isOpen : function(){
        return this.doors == "OPEN";
    },


    addCommand : function(command){
        console.log("ADD COMMAND", command);

       //commands.push(command);
       debugger;

       if(this.commands.length == 0) {
            this.commands.push(command);
        } else {
            var insertAt = this.locationOf(command);
            console.log("insert At", insertAt);
            this.commands.splice( insertAt, 0, command);
        }

        console.log("inserted in COMMANDS", this.commands);
       


/*        if( (commands.length == 0) || (this.afterNext(command) ) ){
            commands.push(command);    
        }else{
            console.log("will be the next command ", command);
            commands.unshift(command);//should be treated before next one   
        }
*/        
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
            case "PREPARING":
                this.doors = "CLOSE";
                break;
            default :
            break;

        }
    },


    afterNext : function(command){
        
        var next = this.commands[0] ;
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
        if(this.commands.length == 0){
            return ;
        }
        var next = this.commands[0];
        if( (next.floor == this.floor) && this.isOpen()) {
            this.commands = this.commands.slice(1); //la commande a été traitée
            next = this.commands[0];
        }
        console.log("next floor ", next.floor);
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
        this.commands = [];        
    }

}

function nextStep(){
        var nextStep = "NOTHING";

        console.log("NEXT Step - actual State : ", elevator.doors + " " + elevator.move);

        var toGo = elevator.nextFloor();
        if(!toGo){
            console.log("Next Step is " + "NOTHING");            
            return "NOTHING";   
        }
        var direction = (elevator.floor > toGo) ? "DOWN" : ( (elevator.floor < toGo) ? "UP" : "");


        if((elevator.doors == "OPEN") && (direction != "") ){
            elevator.changeState("PREPARING");
            nextStep = "CLOSE";

        }else if( (elevator.doors == "CLOSE") && (direction == "") ) {
            elevator.changeState("STOP");

            //elevator.doors = "OPEN";
            
            nextStep = "OPEN";            

        }else if( direction == "UP"){
            elevator.changeState("UP");
            nextStep = "UP";

        }else if( direction == "DOWN"){
            elevator.changeState("DOWN");
            nextStep = "DOWN";

        }else {
            return "NOTHING";
        }

        console.log("NEXT Step - new State : ", elevator.doors + " " + elevator.move);
        console.log("Next Step " + nextStep);
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
