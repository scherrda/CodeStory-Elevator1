describe("Code Story Elevator", function() {
    it("initial doors state", function() {
        expect(elevator.doors).toEqual("CLOSE");
    });
    
    it("initial move", function() {
        expect(elevator.move).toEqual("STOP");
    });
    
});