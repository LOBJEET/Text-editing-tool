

export { Stack }

class Stack{
    constructor(){
        this.size = 0; // tells the current size of the stack
        this.buffer = 4; // // maximum length allowed for each stack entry
        this.stack = []; // // array to hold the stack elements
    }

    clear(){
        this.size = 0; // reset the size to zero
        this.stack = []; // clear the stack array
    }

    isEmpty(){
        return  ( this.size === 0 ); // returns true if the stack is empty, false otherwise
    }

    top(){
        return this.stack[this.size-1]; // returns the top element of the stack without removing it
    }

    pop(){
        if(!this.isEmpty()) {
            this.size--; // decrement the size of the stack
            return this.stack.pop(); // remove and return the top element of the stack
        } else{
            return [-1,'']; // return an error code and an empty string if stack is empty
        }
    }

    push(type, char){
        if(this.isEmpty()){
            if(type===0) // if stack is empty and operation is insert
                this.stack.push([type, char]); // push the operation type and character
        } else{
            let
            tmp = this.top(); // get the top element of the stack
            if(tmp[0]===type && tmp[1].length < this.buffer){
                // if top operation type matches current operation type and not exceeding buffer length
                let top = this.pop(); // remove the top element
                top[1] = char + top[1]; // prepend current character to the top element character string
                this.stack.push(top); // push the updated top element back to the stack
            } else{
                this.stack.push([type, char]); // push new operation type and character to the stack
            }
        }
        this.size++; // increment the size of the stack
    }
}