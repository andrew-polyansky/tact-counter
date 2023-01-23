import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

contract SampleTactContract with Deployable {

    counter: Int as uint32;

    init(c: Int) {
        self.counter = c;
    }

    fun add(v: Int) {    
        // Update counter
        self.counter = (self.counter + v);
    }

    receive(msg: Add) {
        self.add(msg.amount);
    }

    receive("increment") {
        self.add(1);
    }

    get fun counter(): Int {
        return self.counter;
    }
}