var inText = document.getElementById("inText");
var inGen = document.getElementById("inGen");
var outText = document.getElementById("outText");
//Holds output
var out = "";
//Holds the entered fields
var fields = []
//called when clicking 'Generate Fields' button
//reads text and generates input Boxes inside the 'inGen' div
function genFlds(){
	var text = inText.value;
	fields = [];
	readingFld = false;
	fld = ""; 
	for (i = 0; i < text.length;i++){
		//if reading
		if (readingFld){
			//check for ']', ignore '\]'
			if (text[i] == ']'){
				//ignoring '\]'
				if (i > 1)
					if (text[i-1] =='\\'){
						fld += text[i];
						continue;
					}
				fields.push(fld);
				fld = "";
				readingFld = false;
				continue;
			}
			fld += text[i];
		}
		//check for '[', ignore '\['
		if (text[i] == '['){
			//ignoring '\['
			if (i > 1)
				if (text[i-1] =='\\')
					continue;
			readingFld = true;
		}

	}
	console.log(fields)
}
//called when clicking 'Generate Output' button
//generates output in outText
function genOut(){

}
//called when clicking 'Send E-mail' button
//sends an email using generated output to address in 'mail' feild
function mail(){

}
