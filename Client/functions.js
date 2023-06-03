import { httpLibrary } from './httpLibrary.js'
const newLibrary = new httpLibrary();
const completedList = [];
// Listener for the HTML buttons
window.addEventListener("DOMContentLoaded", async () => {

  /* Post Handler*/
  document.getElementById("add").addEventListener("click", async (event) => {
    const item = document.getElementById("listitem").value; // sets item to the inserted value
    if (item == "") {
      event.preventDefault();
      document.getElementById("response").style.color = "red";
      document.getElementById("response").innerHTML = `<p>Added task is empty </p>`;
      return;
    }
    try {
      console.log("Item posted: ", item);
      await newLibrary.post(item); // posts item to list.json
    } catch (err) {
      console.log("Post did not work: ", err);
    }
    GetList()
  });

  /* Delete Handlers*/
  document.getElementById("list").addEventListener("click", async (event) => {
      const button = event.target;
      if (button.classList.contains("delete-button")) {
        console.log("Deleted element");
        const toDelete = button.getAttribute("data-id");
        console.log(toDelete);
        try {
          await newLibrary.delete(toDelete);
        } catch (err) {
          console.log("Delete did not work: ", err);
        }
        GetList()
      }
    });
    document.getElementById("completed-list").addEventListener("click", async (event) => {
      const button = event.target;
      if (button.classList.contains("delete-button")) {
        console.log("Deleted element");
        const toDelete = button.getAttribute("data-id");
        console.log(toDelete);
        try {
          await newLibrary.delete(toDelete);
        } catch (err) {
          console.log("Delete did not work: ", err);
        }
        GetList()
      }
    });

  /* Put Handler for Edit */
  document.getElementById("list").addEventListener("click", async (event) => {
      const button = event.target;
      button.hidden = true;
      
      /* Checks if the button.classList */
      if (button.classList.contains("edit-button")) {
        event.preventDefault();
        console.log("Began editing element");
    
        /* Creation of parent div element */
        const div= document.createElement('div');
        div.classList.add('edit-container');
    
        /* Creation of new input element to edit name */
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter New Name';
    
        /* Handle click event on the input to prevent it from disappearing */
        input.addEventListener('click', (event) => {
          event.stopPropagation();
        });
    
        /* Creation of form element */
        const form = document.createElement('form');
    
        /* Creation of button to confirm edit */
        const confirm = document.createElement('button');
        confirm.type = 'submit';
        confirm.class = 'confirm-button';
        confirm.innerText = 'Confirm';
        const toEdit = button.getAttribute("data-id"); // Gets the task's id number
    
        /* Append the input and confirm button to the form element */
        form.appendChild(input);
        form.appendChild(confirm);
    
        /* Append the form element to the recently created div element */
        div.appendChild(form);
    
        /* Append the div element to the parent element */
        const parentElement = button.parentElement;
        parentElement.appendChild(div);
        console.log(toEdit);
    
        /* Event Listener for the form submission */
        form.addEventListener('submit', async (event) => {
          event.preventDefault(); 
          const newName = input.value;
          try {
            await newLibrary.put(toEdit, newName);
            console.log('Put correctly');
            button.hidden = false;
            GetList();
          } catch (error) {
            console.log('Error putting:', error);
          }
          /* Remove the div element */
          parentElement.removeChild(div);
        });
      } else if (button.classList.contains("complete-button")) {
        const toEdit = button.getAttribute("data-id");
        try {
          await newLibrary.put(toEdit);
          console.log('Completed correctly');
          button.hidden = false;
          GetList();
        } catch (error) {
          console.log('Error completing:', error);
        }
      }
    });

  /* Put Handler for Complete */
  document.getElementById("list").addEventListener("click", async (event) => {
      const button = event.target;
      button.hidden = true;
      const toEdit = button.getAttribute("data-id");
      if (button.classList.contains("complete-button")) {
          event.preventDefault();
          console.log("Began Completing Item");
          try {
              await newLibrary.put(toEdit);
          } catch (err) {
              console.log("Complete did not work: ", err);
          }
          GetList();
      }
  });

});
  
/* Gets List From DB */
async function GetList() {
  // This will get the data from list.json
  const tasks = await newLibrary.get(); // Fetches from list
  let output = "<ul>";
  let outputC = "<ul>";
  for (const item of tasks.task) {
      if(item.completed == false){
          output += 
      `<li>
          <div class = "item-list">
              <p>${item.name}</p> 
              <button type = "submit" class="complete-button" data-id = ${item._id}> Complete </button>
              <button type = "submit" class="delete-button" data-id = ${item._id}> Delete </button>
              <button type = "submit" class="edit-button" data-id = ${item._id}> Edit </button>
          </div>
      </li>`;
      }
      else {
          outputC += 
      `<li>
          <div class = "item-list">
              <p style="color: red">${item.name}</p> 
              <button type = "submit" class="delete-button" data-id = ${item._id}> Delete </button>
          </div>
      </li>`;
      }
  }
  output += "</ul>";
  outputC += "</ul>";
  document.getElementById("list").innerHTML = output;
  document.getElementById("completed-list").innerHTML = outputC;
}

GetList();