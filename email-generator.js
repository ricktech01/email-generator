//box containing user text
var inText = document.getElementById("inText");
//div containing generated fields
var inGen = document.getElementById("inGen");
//span containing the output text
var outText = document.getElementById("outText");
//inputs for email & subject
var mail = document.getElementById("mail");
var sub = document.getElementById("sub");
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
//used to replace strings strA with strB in given text
function rep(strA, strB, text){
	var temp="";
	var r = false;
	var s = "";
	for (var i = 0; i < text.length; i++){
		if (r){
			s+= text[i];
			if (text[i] == ']' && text[i-1] != '\\'){
				r = false;
				if (strA == s.substring(1,s.length-1))
					s = strB;
				temp += s;
				s = "";
			}
		} else {
			if (text[i]=='[' && i > 0 && text[i-1] != '\\'){
				r = true;
				s += '[';
			} else {
				temp += text[i];
			}
		}
	}
	return temp;
}
//called when clicking 'Generate Output' button
//generates output in outText
function genOut(){
	var temp = inText.value;
	for (var i = 0; i < fields.length; i ++){
		var inVal = document.getElementById("fld"+fields[i]).value;
		temp = rep(fields[i],inVal, temp);
		alert(fields[i] + "-" + temp)
	}
	outText.innerHTML = temp.replace('\\', '');
}
//called when clicking 'Send E-mail' button
//sends an email using generated output to address in 'mail' feild
function sendMail(){
	window.open('mailto:'+mail.value+'?subject='+sub.value+'&body='+outText.innerText);
}
