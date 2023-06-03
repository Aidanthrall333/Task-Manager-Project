export class httpLibrary {
    // FINISHED
    async get() {
      try {
        let response = await fetch("/tm/v0/tasks");
        console.log(response);
        let tasks = await response.json();
        console.log(tasks);
        if (response.ok) {
          console.log("returned tasks");
          return tasks;
        } else {
          console.log("did not return tasks");
          document.getElementById("booksDisplay").innerHTML = "Error In Getting Data";
        }
      } catch (error) {
        console.log(error.toString());
      }
    }
    // FINISHED
    async post(data) {
      try {
        const taskData = { name: data }
        const dat = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData), // Stringify data before sending
        };
  
        console.log("Post Data: ", data);
        let response = await fetch("/tm/v0/tasks", dat);
        let postData = await response.json();
        console.log("Response: ", response);
        console.log("Post Data: ", postData);
        return postData;
      } catch (exception) {
        console.log("Error: ", exception);
      }
    }
    // Finished
    async delete(id) {
        try {
            const taskData = { _id: id }
            const deleteMethod = {
                method: 'DELETE',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(taskData)
                }
                let response = await fetch(`/tm/v0/tasks/${id}`, deleteMethod);
                return response;
        }
        catch (error) {
            console.log("Did not delete properly on front end, ", error)
        }
    }
    // Finished
    async put(id, putData = null) {
        try {
          const url = `/tm/v0/tasks/${id}`;
          let changedData;
      
          if (putData) {
            changedData = { name: putData };
          } else {
            changedData = { completed: true };
          }
      
          const putMethod = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(changedData),
          };
      
          let response = await fetch(url, putMethod);
          let data = await response.json();
          console.log(data);
          return response;
        } catch (exception) {
          console.log(exception.toString());
        }
      }
}
