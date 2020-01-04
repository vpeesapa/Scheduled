//id points to schedule or reminder or notes
var SIndex = 0; //index for current selected schedule
var RIndex = 0; //index for current selected reminder
var NIndex = 0; //index for current selected notes
var Schedule = document.getElementById("Schedule"), //id for schedule table is Schedule
	Reminder = document.getElementById("Reminder"), //id for reminder table is Reminder
	Notes = document.getElementById("Notes");  //id for nots table is Notes

function swapSchedule(i, j) {
	var cell0 = Schedule.rows[i].cells[0].innerHTML,
		cell1 = Schedule.rows[i].cells[1].innerHTML,
		cell2 = Schedule.rows[i].cells[2].innerHTML,
		cell3 = Schedule.rows[i].cells[3].innerHTML;

	Schedule.rows[i].cells[0].innerHTML = Schedule.rows[j].cells[0].innerHTML;
	Schedule.rows[i].cells[1].innerHTML = Schedule.rows[j].cells[1].innerHTML;
	Schedule.rows[i].cells[2].innerHTML = Schedule.rows[j].cells[2].innerHTML;
	Schedule.rows[i].cells[3].innerHTML = Schedule.rows[j].cells[3].innerHTML;
	Schedule.rows[j].cells[0].innerHTML = cell0;
	Schedule.rows[j].cells[1].innerHTML = cell1;
	Schedule.rows[j].cells[2].innerHTML = cell2;
	Schedule.rows[j].cells[3].innerHTML = cell3;
}

function compare(i, j) {
	var stimei = Schedule.rows[i].cells[2].innerHTML.split("-")[0].trim(),
	 	etimei = Schedule.rows[i].cells[2].innerHTML.split("-")[1].trim(),
	 	stimej = Schedule.rows[j].cells[2].innerHTML.split("-")[0].trim(),
	 	etimej = Schedule.rows[j].cells[2].innerHTML.split("-")[1].trim();
	var stimei0 = Number(stimei.split(":")[0]),
	 	stimei1 = Number(stimei.split(":")[1]),
	 	etimei0 = Number(etimei.split(":")[0]),
	 	etimei1 = Number(etimei.split(":")[1]),
	 	stimej0 = Number(stimej.split(":")[0]),
	    stimej1 = Number(stimej.split(":")[1]),
	 	etimej0 = Number(etimej.split(":")[0]),
	 	etimej1 = Number(etimej.split(":")[1]);
	if(stimei0 < stimej0) {
	 	return -1;
	} 

	else if(stimei0 == stimej0) {
	 	if(stimei1 < stimej1) {
	 		return -1;
	 	  }
	 	else if(stimei1 == stimej1) {
	 		if(etimei0 < etimej0) {
	 			return -1;
	 		} 
	 		else if(etimei0 == etimej0) {
	 			if(etimei1 < etimej1) {
	 				return -1;
	 			}
	 			else {
	 				return 1;
	 			}
	 		}
	 		else {
	 			return 1;
	 		}
	 	} 
	 	else {
	 		return 1;
	 	}
	}
	else {
	 	return 1;
	}
}

function sortSchedule() {
	var index;
	for(var i = 1; i < Schedule.rows.length - 1; i++) {
		index = i;
		for(var j = i + 1; j < Schedule.rows.length; j++) {
			if(compare(j, index) == -1) {
				swapSchedule(index, j);
			}
		}
	}
}


function load(id) {
	var cell;
	var name;
	var row;
	if(id == "Schedule") {
		row = localStorage.getItem("Srow");
		for(var i = 1; i < row; i++) {
			var newRow = Schedule.insertRow(Schedule.length);
			for(var j = 0; j < 4; j++) {
				cell = newRow.insertCell(j);
				name = "Scell" + i + j;
				cell.innerHTML = localStorage.getItem(name);
			}
		}
	}	
	else if(id == "Reminder") {
		row = localStorage.getItem("Rrow");
		for(var i = 1; i < row; i++) {
			var newRow = Reminder.insertRow(Reminder.length);
			for(var j = 0; j < 2; j++) {
				cell = newRow.insertCell(j);
				name = "Rcell" + i + j;
				cell.innerHTML = localStorage.getItem(name);
				if(j==1&&cell.innerHTML=="HIGH")
				  {
				   Reminder.rows[i].classList.toggle("darksalmon");
				  }
			        else if(j==1&&cell.innerHTML=="MEDIUM")
			               {
			                Reminder.rows[i].classList.toggle("gold");
			               }
			}
		}
	}
	else if(id == "Notes") {
		row = localStorage.getItem("Nrow");
		for(var i = 1; i < row; i++) {
			var newRow = Notes.insertRow(Notes.length);
			cell = newRow.insertCell(0);
			name = "Ncell" + i + 0;
			cell.innerHTML = localStorage.getItem(name);
		}
	}
	ToInput(id);
}

//check if "id" has valid inputs
function save(id){
	var name;
	var cell;
	if(id == "Schedule") {
		localStorage.setItem("Srow", Schedule.rows.length);
		for(var i = 1; i < Schedule.rows.length; i++) {
				for(var j = 0; j < 4; j++) {
					cell = Schedule.rows[i].cells[j].innerHTML;
					name = "Scell" + i + j;
					localStorage.setItem(name, cell);
				}
		}
	}	
	else if(id == "Reminder") {
		localStorage.setItem("Rrow", Reminder.rows.length);
		for(var i = 1; i < Reminder.rows.length; i++) {
				for(var j = 0; j < 2; j++) {
					cell = Reminder.rows[i].cells[j].innerHTML;
					name = "Rcell" + i + j;
					localStorage.setItem(name, cell);
				}
		}
	}
	else if(id == "Notes") {
		localStorage.setItem("Nrow", Notes.rows.length);
		for(var i = 1; i < Notes.rows.length; i++) {
			cell = Notes.rows[i].cells[0].innerHTML;
			name = "Ncell" + i + 0;
			localStorage.setItem(name, cell);
		}
	}

}

function checkInput(id) {
	var isEmpty = false;
	if(id == "Schedule") {
    	Class = document.getElementById("class").value,
    	Type = document.getElementById("type").value,
    	STime = document.getElementById("stime").value,
    	ETime = document.getElementById("etime").value,
    	Location = document.getElementById("location").value;
            
    	if(Class == ""){
      	 	alert("You forgot to write down your class name :)");
       		isEmpty = true;
    	}
    	else if(Type == ""){
       		alert("You forgot to write down the type of you class :)");
       		isEmpty = true;
   		}
    	else if(STime == ""){
       		alert("You forgot to write down the starting time of your class :)");
       		isEmpty = true;
    	}
    	else if(!(STime.trim().includes(":"))){
       		alert("The correct format for starting time should be xx:xx :)");
       		isEmpty = true;
    	}
    	else if(ETime == ""){
       		alert("You forgot to write down the ending time of your class :)");
       		isEmpty = true;
    	}
    	else if(!(ETime.trim().includes(":"))){
       		alert("The correct format for ending time should be xx:xx :)");
       		isEmpty = true;
    	}
    	else if(Location == "") {
       		alert("You forgot to write down the location of your class :)");
       		isEmpty = true;
    	}
	}

	else if(id == "Reminder") {
		var reminder = document.getElementById("reminder").value;
		var priority=document.getElementById("priority").value;
		if(reminder == "") {
			alert("Your forgot to write down your reminder :)");
			isEmpty = true;
		}
		if(priority=="")
		  {
		   alert("You forgot to write down the priority level of the reminder :)");
		   isEmpty=true;
		  }
		else if(!(priority=="High"||priority=="high"||priority=="HIGH"||priority=="Medium"||priority=="medium"||priority=="MEDIUM"||priority=="Low"||priority=="low"||priority=="LOW"))
		       {
		        alert("Please enter either high, medium, or low for the priority level :)");
		        isEmpty=true;
		       }
	}
	else if(id == "Notes") {
		var note = document.getElementById("notes").value;
		if(note == "") {
			alert("You forgot to write down your notes :)");
			isEmpty = true;
		}
	}
    return isEmpty;
 }

//make the selected reminder emergent
function emergency() {
	var emergency = Reminder.rows[RIndex].cells[0].innerHTML;
	if(RIndex == 0) {
		alert("No reminder is currently selected to be emergent: To select a reminder, just click on it once :)");
	}
	else {
		var cell0 = Reminder.rows[RIndex].cells[0].innerHTML;
		var cell1 = Reminder.rows[RIndex].cells[1].innerHTML;
		var index = 1;
		if(emergency == "") {
			for(index = RIndex - 1; index > 0 && Reminder.rows[index].cells[0].innerHTML == ""; index--) {
				Reminder.rows[RIndex].cells[0].innerHTML = Reminder.rows[index].cells[0].innerHTML;
				Reminder.rows[RIndex].cells[1].innerHTML = Reminder.rows[index].cells[1].innerHTML;
				Reminder.rows[index].cells[0].innerHTML = cell0;
				Reminder.rows[index].cells[1].innerHTML = cell1;
				RIndex = index;
			}
			Reminder.rows[RIndex].cells[0].innerHTML = "!";
		} 
		else if(emergency == "!") {
			for(index = RIndex + 1; index < Reminder.rows.length && Reminder.rows[index].cells[0].innerHTML != ""; index++) {
				Reminder.rows[RIndex].cells[0].innerHTML = Reminder.rows[index].cells[0].innerHTML;
				Reminder.rows[RIndex].cells[1].innerHTML = Reminder.rows[index].cells[1].innerHTML;
				Reminder.rows[index].cells[0].innerHTML = cell0;
				Reminder.rows[index].cells[1].innerHTML = cell1;
				RIndex = index;
			}
			Reminder.rows[RIndex].cells[0].innerHTML = "";
		}
	}
	document.getElementById("reminder").value="";
	Reminder.rows[RIndex].style.backgroundColor=document.body.style.backgroundColor;
}

//add new entry to "id"
function add(id) { 
	if(!checkInput(id)) {
	  if(id == "Schedule") {
	  		var newRow = Schedule.insertRow(Schedule.length),
          		cell1 = newRow.insertCell(0),
          		cell2 = newRow.insertCell(1),
          		cell3 = newRow.insertCell(2),
          		cell4 = newRow.insertCell(3),
          		Class = document.getElementById("class").value,
          		Type = document.getElementById("type").value,
          		STime = document.getElementById("stime").value;
          		ETime = document.getElementById("etime").value;
          		Location = document.getElementById("location").value;
          		cell1.innerHTML = Class;
          		cell2.innerHTML = Type;
          		cell3.innerHTML = STime + '-' + ETime;
          		cell4.innerHTML = Location;

          		document.getElementById("class").value="";
          		document.getElementById("type").value="";
          		document.getElementById("stime").value="";
          		document.getElementById("etime").value="";
          		document.getElementById("location").value="";
          		sortSchedule();
      }
      else if(id == "Reminder") {
			var newRow = Reminder.insertRow(Reminder.length),
				cell1 = newRow.insertCell(0),
				cell2 = newRow.insertCell(1),
				reminder = document.getElementById("reminder").value,
				priority=document.getElementById("priority").value;
				cell2.innerHTML = priority.toUpperCase();
				cell1.innerHTML = reminder;
				if(priority.toUpperCase()=="HIGH")
				  {
				   newRow.classList.toggle("darksalmon");
				  }
				else if(priority.toUpperCase()=="MEDIUM")
				       {
				        newRow.classList.toggle("gold");
				       }
				document.getElementById("priority").value="";
				document.getElementById("reminder").value="";
	  }
	  else if(id == "Notes") {
			var newRow = Notes.insertRow(Notes.length),
				cell1 = newRow.insertCell(0),
				note = document.getElementById("notes").value;
				cell1.innerHTML = note;
				document.getElementById("notes").value="";
	  }
	  ToInput(id);
	  save(id);
	}
}

//create functions for every row entry clicking
function ToInput(id) {
	var table;
	if(id == "Schedule") {
		for(var i = 1; i < Schedule.rows.length;i++) {
			Schedule.rows[i].onclick = function () {
				var flag = 0;
				if (typeof SIndex != 0 && Schedule.rows[SIndex].classList.contains("selected")){
					Schedule.rows[SIndex].classList.toggle("selected");
					if(SIndex == this.rowIndex) {
						document.getElementById("class").value = "";
 						document.getElementById("type").value = "";
 						document.getElementById("stime").value = "";
 						document.getElementById("etime").value = "";
 						document.getElementById("location").value = "";
						SIndex = 0;
						flag = 1;
					}
				}
				if(SIndex != this.rowIndex && flag == 0) {
 					SIndex = this.rowIndex;
 					var array = this.cells[2].innerHTML.split("-");
 					document.getElementById("class").value = this.cells[0].innerHTML;
 					document.getElementById("type").value = this.cells[1].innerHTML;
 					document.getElementById("stime").value = array[0];
 					document.getElementById("etime").value = array[1];
 					document.getElementById("location").value = this.cells[3].innerHTML;
 				
 					this.classList.toggle("selected");
 				}
			};
		}
	}
	else if(id == "Reminder") {
		for(var i = 1; i < Reminder.rows.length;i++) {
			Reminder.rows[i].onclick = function () {
				var flag = 0;
				if (RIndex != 0 && Reminder.rows[RIndex].classList.contains("selected")){
					if(Reminder.rows[RIndex].classList.contains("selected")) {
						Reminder.rows[RIndex].classList.toggle("selected");
					}
					if(Reminder.rows[RIndex].cells[1].innerHTML == "HIGH") {
						Reminder.rows[RIndex].classList.toggle("darksalmon");
					} 
					else if (Reminder.rows[RIndex].cells[1].innerHTML == "MEDIUM") {
						Reminder.rows[RIndex].classList.toggle("gold");
					} 
					if(RIndex == this.rowIndex) {
						document.getElementById("reminder").value = "";
						document.getElementById("priority").value = "";
						RIndex = 0;
						flag = 1;
					}

				}

				if(RIndex != this.rowIndex && flag == 0) {
 					if(this.classList.contains("darksalmon")) {
						this.classList.toggle("darksalmon");
					}

					if(this.classList.contains("gold")) {
						this.classList.toggle("gold");
					}	
					document.getElementById("reminder").value = this.cells[0].innerHTML;
					document.getElementById("priority").value = this.cells[1].innerHTML;
 					this.classList.toggle("selected");
 					RIndex = this.rowIndex; 
 				}
				
			};
		}
	}
	else if(id == "Notes") {
		for(var i = 1; i < Notes.rows.length;i++) {
			Notes.rows[i].onclick = function () {
				var flag = 0;
				if (typeof NIndex != 0 && Notes.rows[NIndex].classList.contains("selected")){
					Notes.rows[NIndex].classList.toggle("selected");
					if(NIndex == this.rowIndex) {
						document.getElementById("notes").value = "";
						NIndex = 0;
						flag = 1;
					}
				}
				if(NIndex != this.rowIndex && flag == 0) {
 					NIndex = this.rowIndex;
 					document.getElementById("notes").value = this.cells[0].innerHTML;
 					this.classList.toggle("selected");
 				}
			};
		}
	}
}

//edit "id" for current index
function edit(id) {
	var isEmpty = checkInput(id);
	if(id == "Schedule") {
		var Class = document.getElementById("class").value,
        	Type = document.getElementById("type").value,
        	STime = document.getElementById("stime").value,
        	ETime = document.getElementById("etime").value,
        	Location = document.getElementById("location").value;
        	if((SIndex == 0  || SIndex == "undefined") && !isEmpty) {
				alert("You forgot to select a class to be edited : To select a class, just click on it once :)");
			}
        	if(!isEmpty && SIndex > 0){
           		Schedule.rows[SIndex].cells[0].innerHTML = Class;
            	Schedule.rows[SIndex].cells[1].innerHTML = Type;
           		Schedule.rows[SIndex].cells[2].innerHTML = STime + '-' + ETime;
           		Schedule.rows[SIndex].cells[3].innerHTML = Location;
           		sortSchedule();
           		document.getElementById("class").value="";
           		document.getElementById("type").value="";
           		document.getElementById("stime").value="";
           		document.getElementById("etime").value="";
           		document.getElementById("location").value="";
           		Schedule.rows[SIndex].classList.toggle("selected");
           		SIndex = 0;
           	}
    }
    else if (id == "Reminder") {
    	var reminder = document.getElementById("reminder").value;
    	var priority=document.getElementById("priority").value;
    		if((RIndex == 0 || RIndex == "undefined")&& !isEmpty){
				alert("You forgot to select a reminder to be edited : To select a class, just click on it once :)");
			}
        	if(!isEmpty && RIndex > 0){
        	    Reminder.rows[RIndex].cells[1].innerHTML=priority.toUpperCase();
           		Reminder.rows[RIndex].cells[0].innerHTML = reminder;
           		document.getElementById("priority").value="";
        		document.getElementById("reminder").value="";
        		Reminder.rows[RIndex].classList.toggle("selected");
        		if(priority.toUpperCase()=="HIGH")
          		{
           			Reminder.rows[RIndex].classList.toggle("darksalmon")
          		}
        		else if(priority.toUpperCase()=="MEDIUM")
               	{
                	Reminder.rows[RIndex].classList.toggle("gold");
               	}
               	RIndex = 0;
           	}
    }
    else if (id == "Notes") {
    	var notes = document.getElementById("notes").value;
    		if((NIndex == 0 || NIndex == "undefined") && !isEmpty){
				alert("You forgot to select a notes to be edited : To select a class, just click on it once :)");
			}
        	if(!isEmpty && NIndex > 0){
           		Notes.rows[NIndex].cells[0].innerHTML = notes;
           		document.getElementById("notes").value="";
           		Notes.rows[NIndex].classList.toggle("selected");
           		NIndex = 0;
           	}
    }
    save(id);
}


function clearAll(id) {
	if(id == "Schedule") {
		if(Schedule.rows.length == 1) {
			alert("The schedule is empty :)")
		}
		else {
			if(confirm("Are you sure to clear all the schedule?")) {
				for(var i = Schedule.rows.length - 1; i > 0; i--) {
					Schedule.deleteRow(i);
					document.getElementById("class").value = "";
					document.getElementById("type").value = "";
					document.getElementById("stime").value = "";
					document.getElementById("etime").value = "";
					document.getElementById("location").value = "";	
				}		
				SIndex = 0;
			}
		}
	}

	else if(id == "Reminder") {
		if(Reminder.rows.length == 1) {
			alert("The reminders is empty :)")
		}
		else {
			if(confirm("Are you sure to clear all the reminders?")) {
				for(var i = Reminder.rows.length - 1; i > 0; i--) {
					Reminder.deleteRow(i);
					document.getElementById("reminder").value = "";
					document.getElementById("priority").value="";
				}		
				RIndex = 0;
			}
		}
	}

	else if (id == "Notes") {
		if(Notes.rows.length == 1) {
			alert("The notes is empty :)")
		}
		else {
			if(confirm("Are you sure to clear all the notes?")) {
				for(var i = Notes.rows.length - 1; i > 0; i--) {
					Notes.deleteRow(i);
					document.getElementById("notes").value = "";
				}		
				NIndex = 0;
			}
		}
	}
	save(id);
}



//remove an entry according to current index from "id"
function remove(id) {
	if(id == "Schedule") {
		if(SIndex == "undefined" || SIndex == 0){
			alert("You forgot to select a class to be removed : To select a class, just click on it once :)");
		}
		if(SIndex > 0) {
			Schedule.deleteRow(SIndex);
			document.getElementById("class").value = "";
			document.getElementById("type").value = "";
			document.getElementById("stime").value = "";
			document.getElementById("etime").value = "";
			document.getElementById("location").value = "";
		
			sortSchedule();
		}
		SIndex = 0;
	}
	else if(id == "Reminder") {
		if(RIndex == "undefined" || RIndex == 0){
			alert("You forgot to select a reminder to be removed : To select a reminder, just click on it once :)");
		}
		if(RIndex > 0) {
			Reminder.deleteRow(RIndex);
			document.getElementById("reminder").value = "";
			document.getElementById("priority").value="";
		
		}
		RIndex = 0;
	}
	else if (id == "Notes") {
		if(NIndex == "undefined" || NIndex == 0){
			alert("You forgot to select a notes to be removed : To select a notes, just click on it once :)");
		}
		if(NIndex > 0) {
			Notes.deleteRow(NIndex);
			document.getElementById("notes").value = "";
		}
		NIndex = 0;
	}
	save(id);
}
