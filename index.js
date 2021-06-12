"use strict";
let addNoteId = document.getElementById("addNote");

// addnode function
let addNewNote = (text) => {
  let note = document.createElement("div");
  note.classList.add("note");

  let htmlData = `<div class="innerBtns">
                  <div class="btn dropBtn palettebtn">
                       <span id="paletteIcon" class="fas fa-palette icon"></span>
                    <div class="dropContent">
                         <div class="option red" data-type="palette" data-color="red"></div>
                          <div class="option yellow" data-type="palette" data-color="yellow"></div>
                          <div class="option blue" data-type="palette" data-color="blue"></div>
                    </div>
                </div>
                <div class="btn dropBtn brushbtn">
                    <span id="brushIcon" class="fas fa-paint-brush icon"></span>
                    <div class="dropContent">
                         <div class="option red" data-type="brush" data-color="red"></div>
                          <div class="option yellow" data-type="brush" data-color="yellow"></div>
                          <div class="option blue" data-type="brush" data-color="blue"></div>
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

  //gettig references dynamically
  let editBtn = note.querySelector(".editbtn");
  let delBtn = note.querySelector(".delbtn");
  let textareaId = note.querySelector("textarea");
  let mainID = note.querySelector(".main");

  //delete node
  delBtn.addEventListener("click", () => {
    note.remove();
    console.log("deleted");
  });

  //text value //if some data is alreadt ther we need to display it in both conditions
  textareaId.value = text;
  mainID.innerHTML = text;

  //toggle class
  editBtn.addEventListener("click", () => {
    textareaId.classList.toggle("hidden");
    mainID.classList.toggle("hidden");
  });

  //change the Color

  //function to change color
  let changeColor = (type, color) => {
    if (type == "brush") {
      textareaId.style.color = color;
      mainID.style.color = color;
    } else {
      textareaId.style.backgroundColor = color;
      mainID.style.backgroundColor = color;
    }
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

  //onchange event when we click outside the textarea
  textareaId.addEventListener("change", (event) => {
    let currentTextInTextArea = event.target.value; //event was clicking outside,target was textarea and value was inside the teextatea
    mainID.innerHTML = currentTextInTextArea;

    //save the changes when clicked outside and toggle the class
    textareaId.classList.toggle("hidden");
    mainID.classList.toggle("hidden");
  });

  document.querySelector(".notes").appendChild(note); //appending the new note to notes div in DOM
};

//addnode click event
addNoteId.addEventListener("click", () => {
  addNewNote("vdfv");
});

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
