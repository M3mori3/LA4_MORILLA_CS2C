// Queueing System for Customer Service
(function () {
    // Initialize the queue with predefined customers
    let queue = ["Elaine", "Althea", "Angelo", "Lito", "Engelbert"];
    let queueIndex = queue.length + 1; // Start the queue index at the next available number
  
    while (true) {
      console.log("Current Queue:", queue.join(", "));
  
      
      const action = prompt(// Ask the user for their action: add, serve, or exit
        "Enter 'add' to add a customer, 'serve' to serve a customer, or 'exit' to quit:"
      );
  
      if (action === "add") { 
        const customerName = prompt("Enter the customer's name:"); // Prompt the user to enter a customer's name
        if (customerName) {
          queue.push(customerName); // Add the customer's name at the end of the queue
          alert(`Customer ${customerName} added to the queue as number ${queueIndex}.`);
          queueIndex++;  // Increment the queue index for the next customer
        } else {
          alert("Invalid name. Please try again.");
        }
      } else if (action === "serve") { // Prompt the user to enter the number of the customer to be served
        const customerNumber = parseInt(prompt("Enter the customer number to be served:"), 10);
        if (!isNaN(customerNumber) && customerNumber > 0 && customerNumber <= queue.length) { // Check if the entered number is valid
          const servedCustomer = queue.splice(customerNumber - 1, 1)[0]; // Remove the customer from the queue and store their name 
          alert(`Serving customer: ${servedCustomer}`);
        } else {
          alert("Invalid customer number. Please try again.");
        }
      } else if (action === "exit") {
        alert("Exiting the program. Goodbye!");  // Exit the program and notify the user
        break;
      } else {
        alert("Invalid action. Please enter 'add', 'serve', or 'exit'.");
      }
    }
  })();
  