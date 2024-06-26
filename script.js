// importing class stack from a module stack.js and this will handle the undo stack
import { Stack } from './stack.js';
// onload function is called when the entire webpage has finished loading
onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment'); // for textbox
    const undo = document.getElementById('undo'); // undo button
    const clear = document.getElementById('clear'); // clear button
    const temptext = document.getElementById('temptext'); // area for displaying operations

    textbox.value = ""; // clears any pre existing text in the window
    let text = ""; // initialise a new string
    let stack = new Stack(); // initialising an empty stack

    textbox.onclick = function () { // when the textbox is clicked, the cursor moves to the end of the current text
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };
    // clear button
    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = "";
        temptext.innerHTML = "Sequence of operations will be shown here !";
    };
    // handling text inputs
    textbox.oninput = function(event){
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data); 
// If text is inserted, it pushes an operation (0 for insert) and the inserted text to the stack.
                break;
            case "deleteContentBackward":
                stack.push(1, text[text.length-1]);
                break;
// If text is deleted, it pushes an operation (1 for delete) and the deleted character to the stack.
        }

        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };
    // undo button
    undo.onclick = function () {
        let operation = stack.pop(); // Pops the last operation from the stack
        if(operation[0]!==-1){ // Checks if the stack is not empty
            // Updates the temptext element to show that an undo operation is being performed.
            temptext.innerHTML = "Performing undo operation<br>"+temptext.innerHTML; 
            if(operation[0] === 0){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };
};
/* basically this project aims to :
1. The code sets up event listeners for a textbox, undo button, and clear button.
2. It maintains a stack to track text insertions and deletions for undo functionality.
3. It updates the display to show a history of operations and performs undo operations as needed. */