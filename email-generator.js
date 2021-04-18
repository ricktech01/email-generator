//box containing user text
var inText = document.getElementById("inText");
//div containing generated fields
var inGen = document.getElementById("inGen");
//span containing the output text
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
	//Clear fields
	while (inGen.firstChild){
		inGen.removeChild(inGen.firstChild);
	}
	//Generate Fields
	for (i = 0; i < fields.length; i++){
		l = document.createElement("LABEL");
		l.appendChild(document.createTextNode(fields[i]+":"));
		inGen.appendChild(l);

		l = document.createElement("INPUT");
		l.setAttribute("type", "text");
		l.setAttribute("id", "fld" + fields[i]);
		inGen.appendChild(l);

		l = document.createElement("BR");
		inGen.appendChild(l);
	}
}
//called when clicking 'Generate Output' button
//generates output in outText
function genOut(){

	var text = inText.value;

	for(c = 0; c < fields.length; c++){
		search = "[" + fields[c] + "]";
		searchReplace = document.getElementById("fld" + fields[c]).value;
		searchIndex = text.indexOf(search);

		text = text.substring(0, searchIndex) + searchReplace + text.substring(searchIndex + search.length);

		text.replace(search, searchReplace);
	}

	text.replaceAll('\\', "");

	for(x = 0; x < text.length; x++){
		if(text[x] == '\\'){
			text = text.substring(0, x) + text.substring(x + 1);
		}
	}

	outText.innerText = text;
	
}//end of function




//called when clicking 'Send E-mail' button
//sends an email using generated output to address in 'mail' feild
function mail(){

}
