describe("Code Story Elevator", function() {
	
	it("init state: doors are closed.", function() {
		expect(elevator.doors).toEqual("CLOSE");
		expect(elevator.isOpen()).toEqual(false);
	});

	it("init state:The Elevator is stopped.", function() {
		expect(elevator.move).toEqual("STOP");
	});

	it("init state of commands list: empty", function() {
		expect(elevator.commands.length).toEqual(0);
	});
	
	it("adding first command", function() {
		elevator.addCommand("new command");
		expect(elevator.commands.length).toEqual(1);
		expect(elevator.commands[0]).toEqual("new command");
	});
	
	it("first call to the next command", function() {
		expect(nextStep()).toEqual("NOTHING");
	});
	
	it("reset after adding a command", function() {
		
		elevator.addCommand("new command");
		
		expect(reset()).toEqual("");
		expect(elevator.doors).toEqual("CLOSE");
		expect(elevator.commands.length).toEqual(0);
	});

	it("calling the elevator up to first floor", function() {
				
		expect(call(1, "UP")).toEqual("");
		expect(elevator.doors).toEqual("CLOSE");
		expect(elevator.commands[0].floor).toEqual(1);
		expect(elevator.commands[0].direction).toEqual("UP");
		expect(elevator.nextFloor()).toEqual(1);
	});

	
	it("3 calls to the elevator up", function() {
		reset();
		expect(call(5, "UP")).toEqual("");
		expect(call(3, "down")).toEqual("");
		expect(call(2, "UP")).toEqual("");
		expect(elevator.commands[0].floor).toEqual(2);
		expect(elevator.commands[2].floor).toEqual(5);
		expect(elevator.nextFloor()).toEqual(2);
	});
	
	it("going to the first floor", function() {
		reset();
		expect(go(1)).toEqual("");
		expect(elevator.commands[0].floor).toEqual(1);
		expect(elevator.commands[0].direction).toEqual("UP");
	});
	
	it("going to the 0 floor", function() {
		reset();
		expect(go(0)).toEqual("");
		expect(elevator.commands.length).toEqual(0);
	});
	
	
});