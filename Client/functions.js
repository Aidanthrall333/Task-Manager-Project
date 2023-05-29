// The HTTP Library
// Will hold api fetch commands
class httpLibrary{
    
    // FINISHED
    async get(){
        try{
            let response = await fetch("/tm/v0/tasks");
            console.log(response);
            let tasks = await response.json();
            console.log(tasks);
            if(response.ok){
                console.log("returned tasks");
                return tasks;
            }
            else{
                console.log("did not return tasks");
                document.getElementById("booksDisplay").innerHTML = "Error In Getting Data";
            }
        }
        catch(error){
            console.log(error.toString());
        }
        
    }
    // TODO
    async post(data){
        try {
            const dat = {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(data)
            }
            console.log("data body" + dat.body);
            let response = await fetch("/tm/v0/tasks", dat);
            let postData = await response.json();
            console.log("Post Data " + dat);
            return postData;
        }
        catch(exception) {
            console.log(exception.toString());
        }
    }
}

const newLibrary = new httpLibrary();
// Listener for the HTML buttons
window.addEventListener('DOMContentLoaded', async () => {
      /* Post Handler TODO*/
      document.getElementById('add').addEventListener('click', async (event)=> {
        event.preventDefault();
        const item = document.getElementById('listitem').value; // sets item to the inserted value
        if(item == ""){
            event.preventDefault();
            document.getElementById("response").style.color = "red";
            document.getElementById("response").innerHTML = `<p>Added task is empty </p>`
            return;
        }
        try {
            console.log("Item posted");
            await newLibrary.post(item);  // posts item to list.json 
        }
        catch (err) {
            console.log("Post did not work" + err);
        }
      })

      /* Delete Handler TODO*/ 
      document.getElementById('delete').addEventListener('click', async (event)=> {
        
      })
});

async function GetList(){ // This will get the data from list.json 
    const tasks = await newLibrary.get(); // Fetches from list
    let output = "<ol>";
    if (tasks.task.length === 0)
        return;
    for (const item of tasks.task){
        output += `<li>${item.name}</li>`;
    }
    output += "</ol>"
    document.getElementById("list").innerHTML = output;
}
GetList();

