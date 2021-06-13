"use strict";

let addNoteId = document.getElementById("addNote");

//update locaalS function
let updateLocalS = () => {
  let notes = [];

  let notesArray = document.querySelectorAll(".note"); //returns a nodeList
  notesArray.forEach((note) => {
    let textareaID = note.querySelector(".note textarea"); //fetch the text inside the textarea of a note

    notes.push([
      //push all three values about a note
      textareaID.value,
      textareaID.style.backgroundColor,
      textareaID.style.color,
    ]); //push note data into the array
  });

  localStorage.setItem("notesKey", JSON.stringify(notes)); //udpate localS
};

// add new note function
let addNewNote = (text, bgcolor, textcolor) => {
  let note = document.createElement("div");
  note.classList.add("note");

  let htmlData = `<div class="innerBtns">
                  <div class="btn dropBtn palettebtn">
                       <span id="paletteIcon" class="fas fa-palette icon"></span>
                    <div class="dropContent">
                         <div class="option red" data-type="palette" data-color="#e74c3c"></div>
                          <div class="option yellow" data-type="palette" data-color="#f9ca24"></div>
                          <div class="option blue" data-type="palette" data-color="#0984e3"></div>
                    </div>
                </div>
                <div class="btn dropBtn brushbtn">
                    <span id="brushIcon" class="fas fa-paint-brush icon"></span>
                    <div class="dropContent">
                         <div class="option red" data-type="brush" data-color="#e74c3c"></div>
                          <div class="option yellow" data-type="brush" data-color="#f9ca24"></div>
                          <div class="option blue" data-type="brush" data-color="#74b9ff"></div>
                    </div>
                </div>
                        <div class="btn operators editbtn">
                            <span class="fas fa-pencil-alt icon green"></span>
                            <div class="btnBg edit"></div>
                        </div>
                        <div class="btn operators delbtn">
                            <span class="fas fa-trash-alt icon red"></span>
                            <div class="btnBg delete"></div>
                        </div>
                    </div>
              <div class="main ${text == "" ? "hidden" : ""}"></div>
                 <textarea class=" ${text == "" ? "" : "hidden"} " ></textarea>
               `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  //gettig references dynamically for the clicked note
  let editBtn = note.querySelector(".editbtn");
  let delBtn = note.querySelector(".delbtn");
  let textareaId = note.querySelector("textarea");
  let mainId = note.querySelector(".main");

  //delete a note
  delBtn.addEventListener("click", () => {
    note.remove();
    updateLocalS();
  });

  //text,background-color,text-color value //if some data is already there we need to display it in both conditions textarea and main div both
  textareaId.value = text;
  textareaId.style.color = textcolor;
  textareaId.style.backgroundColor = bgcolor;
  mainId.innerHTML = text;
  mainId.style.color = textcolor;
  mainId.style.backgroundColor = bgcolor;

  //toggle class
  editBtn.addEventListener("click", () => {
    textareaId.classList.toggle("hidden");
    mainId.classList.toggle("hidden");
  });

  //change the Color

  //function to change color
  let changeColor = (type, color) => {
    if (type == "brush") {
      //brush means text color
      textareaId.style.color = color;
      mainId.style.color = color;
    } else {
      textareaId.style.backgroundColor = color;
      mainId.style.backgroundColor = color;
    }
    updateLocalS(); //update the color changes in the local storage
  };

  //adding events to all color options of both brush and palette
  note.querySelectorAll(".brushbtn .option").forEach((item) => {
    item.addEventListener("click", () => {
      let type = item.getAttribute("data-type");
      let color = item.getAttribute("data-color");
      changeColor(type, color);
    });
  });

  note.querySelectorAll(".palettebtn .option").forEach((item) => {
    item.addEventListener("click", () => {
      let type = item.getAttribute("data-type");
      let color = item.getAttribute("data-color");
      changeColor(type, color);
    });
  });

  //remove event of onclick from add new note button while hovering palette/brushbtn
  let dropBtns = note.querySelectorAll(".innerBtns .btn.dropBtn");

  dropBtns.forEach((element) => {
    element.addEventListener("mouseover", () => {
      let addNoteBtn = document.querySelector("#addNote");
      addNoteBtn.classList.add("removeEvent");
      console.log("hover");
    });
  });

  dropBtns.forEach((element) => {
    element.addEventListener("mouseout", () => {
      let addNoteBtn = document.querySelector("#addNote");
      addNoteBtn.classList.remove("removeEvent");
      console.log("hover");
    });
  });

  //onchange event when we click outside the textarea
  textareaId.addEventListener("change", (event) => {
    let currentTextInTextArea = event.target.value; //event was clicking outside,target was textarea and value was inside the teextatea
    mainId.innerHTML = currentTextInTextArea;

    //update the localS when there is change in node
    updateLocalS();
  });

  document.querySelector(".notes").appendChild(note); //appending the new note to the notes div in DOM
};

//addnode click event to the add new note button
addNoteId.addEventListener("click", () => {
  addNewNote(
    "welcome to Nipun Keep! start by clicking the green pencil button to edit this note"
  );
});

//display function
let displayNotes = () => {
  let notesString2d = localStorage.getItem("notesKey"); //will return null if no string is present at the given key
  let notesArray2d = JSON.parse(notesString2d);

  if (notesString2d != null && notesString2d != "[]") {
    notesArray2d.forEach((noteData) => {
      //noteData is also an array having 3 values
      addNewNote(noteData[0], noteData[1], noteData[2]);
    });
  }
};

displayNotes(); //call once on loading the page

//OTHER METHOD(to change color)
//other way to add color changing functionality
//   let brushr = note.querySelector(".brushbtn .option.red");
//   let brushb = note.querySelector(".brushbtn .option.blue");
//   let brushy = note.querySelector(".brushbtn .option.yellow");
//   let paletter = note.querySelector(".palettebtn .option.red");
//   let paletteb = note.querySelector(".palettebtn .option.blue");
//   let palettey = note.querySelector(".palettebtn .option.yellow");

//  brushr.addEventListener("click", () => {
//    changeColor("brush", "red");
//  });
//  brushb.addEventListener("click", () => {
//    changeColor("brush", "blue");
//  });
//  brushy.addEventListener("click", () => {
//    changeColor("brush", "yellow");
//  });
//  paletter.addEventListener("click", () => {
//    changeColor("palette", "red");
//  });
//  paletteb.addEventListener("click", () => {
//    changeColor("palette", "blue");
//  });
//  palettey.addEventListener("click", () => {
//    changeColor("palette", "yellow");
//  });
