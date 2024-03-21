const result = document.getElementById("result");
const instantResult = document.getElementById("instantResult");
const buttons = document.querySelectorAll("button");
let currentNumberIndex; 
let temporaryNumbers = [];
let isDotPresent = false; // to control dot not to reapeat
let joinedNumbers;
let hasError = false;
function displayValue(btn) {
  const val = btn.textContent;
  if (val == "=") {
    
    try {
      if (result.value == "") {
        result.value = result.value;
      }else if(result.value.includes("=")){// not to repeat = sign multiple times
        result.value = result.value;
      } else if(result.value[currentNumberIndex] == "0" && result.value[currentNumberIndex - 1] == "÷"){
        alert("Can not Divivde by Zero")

      } else if (
        result.value[currentNumberIndex] == "x" ||
        result.value[currentNumberIndex] == "-" ||
        result.value[currentNumberIndex] == "+" ||
        result.value[currentNumberIndex] == "%" ||
        result.value[currentNumberIndex] == "÷"
      ) {
        result.value = result.value;
      } else {
        /* Substituting * and / by x and division sign */
        for (let i = 0; i <= currentNumberIndex; i++) {
          if (result.value[i] == "x") {
            temporaryNumbers.push("*");
          } else if (result.value[i] == "÷") {
            temporaryNumbers.push("/");
          } else if(result.value[i] == "("){
            temporaryNumbers.push("*(");
          }else {
            temporaryNumbers.push(result.value[i]);
          }
        }

        if(!hasError) {
          instantResult.style.textAlign = "end";
          instantResult.style.fontSize = "20px";
          hasError = false;
        }
        result.value += "=";
        joinedNumbers = temporaryNumbers.join("");
        instantResult.value = eval(joinedNumbers);
      }
    } catch (error) {
        instantResult.value = `Error: syntax error`;
        instantResult.style.textAlign = "start";
        instantResult.style.fontSize = "12px";
        hasError = false;
    } finally {
     setTimeout(() => {
      window.confirm("Did you enjoy my calculator")
     }, 120000);
    }
  }
  /* clear section */
  else if (val == "AC") {
    result.value = "";
    instantResult.value = "";
    temporaryNumbers = [];
    joinedNumbers = "";
    isDotPresent = false;
  }

  else if(result.value.includes("=") && 
  (val == "0"||
  val == "1" ||
  val == "2" ||
  val == "3" ||
  val == "4" ||
  val == "5" ||
  val == "6" ||
  val == "7" ||
  val == "8" ||
  val == "9")) {
    instantResult.value = "";
    joinedNumbers = "";
    temporaryNumbers = [];
    result.value = val;
   }

  else if(result.value.includes("=") && 
  (val == "x"||
  val == "+" ||
  val == "_" ||
  val == "%" ||
  val == "÷" ||
  val == "(" ||
  val == ")")) {
    joinedNumbers = "";
    temporaryNumbers = [];
    result.value = instantResult.value + val;
    instantResult.value = "";
   }

   else if(result.value.includes("=") && val == ".") {
    joinedNumbers = "";
    temporaryNumbers = [];
    result.value = val;
    instantResult.value = "";   
  }


 /* General Logics */
  else if(result.value[currentNumberIndex] == "-" && result.value[currentNumberIndex - 1] == "x" && (val == "+" ||val == "÷" ||val == "%" || val == "x")) {
    result.value = result.value.slice(0,-2);
    result.value += val;

  } else if(result.value[currentNumberIndex] == "-" && (result.value[currentNumberIndex - 1] == "+"||result.value[currentNumberIndex - 1] == "÷"||result.value[currentNumberIndex - 1] == "%") && (val == "+" ||val == "÷" ||val == "%" || val == "x")) {
    result.value = result.value.slice(0,-2);
    result.value += val;
  } else if(result.value[currentNumberIndex] == "0" && (result.value[currentNumberIndex - 1] == "x"||result.value[currentNumberIndex - 1] == "-"||result.value[currentNumberIndex - 1] == "+"||result.value[currentNumberIndex - 1] == "%"||result.value[currentNumberIndex - 1] == "÷") && (val =="1"||val =="2"||val =="3"||val =="4"||val =="5"||val =="6"||val =="7"||val =="8"||val =="9")){
    result.value = result.value.slice(0, -1) + val;
  } else if(result.value == "0" && (val =="1"||val =="2"||val =="3"||val =="4"||val =="5"||val =="6"||val =="7"||val =="8"||val =="9")){
    result.value = result.value.slice(0,-1) + val;
  }
   else if (
    result.value == "-" &&
    (val == "x" || val == "÷" || val == "+" || val == "%")
  ) {
    result.value = "";
  }
/* Delete one character section design */
  else if (val == "DEL") {
    instantResult.value = "";
    temporaryNumbers = [];
    if (result.value[currentNumberIndex] == ".") {
      result.value = result.value.slice(0, -1);
      isDotPresent = false;
    } else {
      result.value = result.value.slice(0, -1);
    }
  } 
  /* Sqrt function design */
  else if (val == "sqrt") {
    result.value += val;
    /* multiplication section */
  } else if (val == "x") {
    switch (result.value[currentNumberIndex]) {
      case "+":
        result.value = result.value.slice(0, -1);
        result.value += "x";
        isDotPresent = false;
        break;
      case "-":
        result.value = result.value.slice(0, -1);
        result.value += "x";
        isDotPresent = false;
        break;
      case "÷":
        result.value = result.value.slice(0, -1);
        result.value += "x";
        isDotPresent = false;
        break;
      case "%":
        result.value = result.value.slice(0, -1);
        result.value += "x";
        isDotPresent = false;
        break;
      case "x":
        result.value = result.value;
        break;
      default:
        if (result.value == "") {
          result.value = result.value;
        } else if (
          result.value[currentNumberIndex] == "0" ||
          result.value[currentNumberIndex] == "1" ||
          result.value[currentNumberIndex] == "2" ||
          result.value[currentNumberIndex] == "3" ||
          result.value[currentNumberIndex] == "4" ||
          result.value[currentNumberIndex] == "5" ||
          result.value[currentNumberIndex] == "6" ||
          result.value[currentNumberIndex] == "7" ||
          result.value[currentNumberIndex] == "8" ||
          result.value[currentNumberIndex] == "9"
        ) {
          result.value += "x";
          isDotPresent = false;
        } else {
          result.value = result.value;
        }
    }
    /* Division section */
  } else if (val == "÷") {
    switch (result.value[currentNumberIndex]) {
      case "+":
        result.value = result.value.slice(0, -1);
        result.value += "÷";
        isDotPresent = false;
        break;
      case "-":
        result.value = result.value.slice(0, -1);
        result.value += "÷";
        isDotPresent = false;
        break;
      case "x":
        result.value = result.value.slice(0, -1);
        result.value += "÷";
        isDotPresent = false;
        break;
      case "%":
        result.value = result.value.slice(0, -1);
        result.value += "÷";
        isDotPresent = false;
        break;
      case "÷":
        result.value = result.value;
        break;
      default:
        if (result.value == "") {
          result.value = result.value;
        } else if (
          result.value[currentNumberIndex] == "0" ||
          result.value[currentNumberIndex] == "1" ||
          result.value[currentNumberIndex] == "2" ||
          result.value[currentNumberIndex] == "3" ||
          result.value[currentNumberIndex] == "4" ||
          result.value[currentNumberIndex] == "5" ||
          result.value[currentNumberIndex] == "6" ||
          result.value[currentNumberIndex] == "7" ||
          result.value[currentNumberIndex] == "8" ||
          result.value[currentNumberIndex] == "9"
        ) {
          result.value += "÷";
          isDotPresent = false;
        } else {
          result.value = result.value;
        }
    }
  } else if (val == "+") {
    /* Addition Section */
    switch (result.value[currentNumberIndex]) {
      case "%":
        result.value = result.value.slice(0, -1);
        result.value += "+";
        isDotPresent = false;
        break;
      case "-":
        result.value = result.value.slice(0, -1);
        result.value += "+";
        isDotPresent = false;
        break;
      case "x":
        result.value = result.value.slice(0, -1);
        result.value += "+";
        isDotPresent = false;
        break;
      case "÷":
        result.value = result.value.slice(0, -1);
        result.value += "+";
        isDotPresent = false;
        break;
      case "+":
        result.value = result.value;
        break;
      default:
        if (result.value == "") {
          result.value = result.value;
        } else if (
          result.value[currentNumberIndex] == "0" ||
          result.value[currentNumberIndex] == "1" ||
          result.value[currentNumberIndex] == "2" ||
          result.value[currentNumberIndex] == "3" ||
          result.value[currentNumberIndex] == "4" ||
          result.value[currentNumberIndex] == "5" ||
          result.value[currentNumberIndex] == "6" ||
          result.value[currentNumberIndex] == "7" ||
          result.value[currentNumberIndex] == "8" ||
          result.value[currentNumberIndex] == "9"
        ) {
          result.value += "+";
          isDotPresent = false;
        } else {
          result.value = result.value;
        }
    }
  } else if (val == "%") {
    /* Modulus Section */
    switch (result.value[currentNumberIndex]) {
      case "-":
        result.value = result.value.slice(0, -1);
        result.value += "%";
        isDotPresent = false;
        break;
      case "+":
        result.value = result.value.slice(0, -1);
        result.value += "%";
        isDotPresent = false;
        break;
      case "x":
        result.value = result.value.slice(0, -1);
        result.value += "%";
        isDotPresent = false;
        break;
      case "/":
        result.value = result.value.slice(0, -1);
        result.value += "%";
        isDotPresent = false;
        break;
      case "%":
        result.value = result.value;
        break;
      default:
        if (result.value == "") {
          result.value = result.value;
        } else if (
          result.value[currentNumberIndex] == "0" ||
          result.value[currentNumberIndex] == "1" ||
          result.value[currentNumberIndex] == "2" ||
          result.value[currentNumberIndex] == "3" ||
          result.value[currentNumberIndex] == "4" ||
          result.value[currentNumberIndex] == "5" ||
          result.value[currentNumberIndex] == "6" ||
          result.value[currentNumberIndex] == "7" ||
          result.value[currentNumberIndex] == "8" ||
          result.value[currentNumberIndex] == "9"
        ) {
          result.value += "%";
          isDotPresent = false;
        } else {
          result.value = result.value;
        }
    }
  } else if (val == "-") {
    /* Subtraction Section */
    switch (result.value[currentNumberIndex]) {
      case "%":
        result.value += "-";
        isDotPresent = false;
        break;
      case "+":
        result.value += "-";
        isDotPresent = false;
        break;
      case "x":
        result.value += "-";
        isDotPresent = false;
        break;
      case "÷":
        result.value += "-";
        isDotPresent = false;
        break;
      case "-":
        result.value = result.value;
        break;
      default:
        if (result.value == "") {
          result.value += "-";
          isDotPresent = false;
        } else if (
          result.value[currentNumberIndex] == "0" ||
          result.value[currentNumberIndex] == "1" ||
          result.value[currentNumberIndex] == "2" ||
          result.value[currentNumberIndex] == "3" ||
          result.value[currentNumberIndex] == "4" ||
          result.value[currentNumberIndex] == "5" ||
          result.value[currentNumberIndex] == "6" ||
          result.value[currentNumberIndex] == "7" ||
          result.value[currentNumberIndex] == "8" ||
          result.value[currentNumberIndex] == "9"
        ) {
          result.value += "-";
          isDotPresent = false;
        } else {
          result.value = result.value;
        }
    }
  } else if (val == ".") {
    /* dot section design */
    switch (result.value[currentNumberIndex]) {
      case "%":
        result.value += "0.";
        isDotPresent = true;
        break;
      case "+":
        result.value += "0.";
        isDotPresent = true;
        break;
      case "-":
        result.value += "0.";
        isDotPresent = true;
        break;
      case "x":
        result.value += "0.";
        isDotPresent = true;
        break;
      case "÷":
        result.value += "0.";
        isDotPresent = true;
        break;
      default:
        if (result.value == "") {
          result.value += "0.";
          isDotPresent = true;
        } else if (result.value[currentNumberIndex] != "." && !isDotPresent) {
          result.value += ".";
          isDotPresent = true;
        } else {
          result.value = result.value;
        }
    }
  }/* working with 00s */
   else if(val == "00"){
    if(result.value == ""){
      result.value = "0";
    }else if(result.value == "0"){
      result.value = result.value;
    }else if(result.value[currentNumberIndex] == "x"||result.value[currentNumberIndex] == "-"||result.value[currentNumberIndex] == "+"||result.value[currentNumberIndex] == "÷"|| result.value[currentNumberIndex] == "%"){
      result.value += "0";
    } else if(result.value[currentNumberIndex] == "0" &&(result.value[currentNumberIndex -1] == "x"||result.value[currentNumberIndex -1] == "-"||result.value[currentNumberIndex -1] == "+"||result.value[currentNumberIndex -1] == "%"||result.value[currentNumberIndex -1] == "÷")){
      result.value = result.value;
    }
   
    else{
      result.value += "00";
    }

  }
   /* working with 0s */
   else if(val == "0"){
    if(result.value == ""){
      result.value = "0";
    }
    else if(result.value == "0"){
      result.value = result.value;
    } else if(result.value[currentNumberIndex] == "0" &&(result.value[currentNumberIndex -1] == "x"||result.value[currentNumberIndex -1] == "-"||result.value[currentNumberIndex -1] == "+"||result.value[currentNumberIndex -1] == "%"||result.value[currentNumberIndex -1] == "÷")){
      result.value = result.value;
    } 
   /* Working with  brackets */
 
    else {
      result.value += "0";
    }
   }
   
   else {
    result.value += val;
  }
  currentNumberIndex = result.value.length - 1; // always holds the current index of the displayed value
}

buttons.forEach(
  (button) =>
    (button.onclick = function () {
      displayValue(button);
    })
);

