var observable = require("data/observable");
var AtletiViewModel = (function (_super) {
    __extends(AtletiViewModel, _super);
    function AtletiViewModel() {
        _super.call(this);
        this.counter = 42;
        this.set("message", this.counter + " taps left");
		this.set("messaggio", "fangaulers");
			this.set("items",[{name: "Home"},{name: "Atleti"},{name: "Gare"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name:"Chiudi AppKwonDo"},{name: "Home"},{name: "Atleti"},{name: "Gare"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name:"Chiudi AppKwonDo"}])
		
    }
    AtletiViewModel.prototype.tapAction = function () {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    }
	
    return AtletiViewModel;
})(observable.Observable);
exports.AtletiViewModel = AtletiViewModel;
exports.atletiViewModel = new AtletiViewModel();

