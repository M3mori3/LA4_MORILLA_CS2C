
// A simple hash function to calculate a hash value (index) for the customer.
function hashFunction(name) {
  let hash = 0;
  // Loop through each character in the name 
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i); // Add the value of each character in the name
  }
  return hash % 10; // Use modulo to limit the hash table index to a size of 10
}

// Initialize the hash table (used for storing customers efficiently)
let hashTable = {};

// Initialize the queue (used to manage customer service order)
let queue = [];

// Initial list of customers to be added to the system
let customers = ["Elaine", "Althea", "Angelo", "Lito", "Engelbert"];

// Store initial customers in the hash table and queue
customers.forEach((customer, index) => {
  let hashIndex = hashFunction(customer); // Get the hash index for the customer
  hashTable[hashIndex] = customer; // Store the customer in the hash table at the calculated index
  queue.push({ number: index + 1, name: customer }); // Add the customer to the queue with a number
});

console.log("Initial queue:", queue); // Display the initial queue in the console

// Function to add a new customer to the system
function addCustomer() {
  let customerName = prompt("Enter the customer's name:"); // Get the customer's name from the user
  let hashIndex = hashFunction(customerName); // Calculate the hash index for the name

  // Check for collision (if the hash index is already in use)
  if (hashTable[hashIndex]) {
    alert("Collision detected! Adjusting hash index.");
    // Simple collision resolution: find the next available index
    while (hashTable[hashIndex]) {
      hashIndex = (hashIndex + 1) % 10; // Try the next index in a circular manner
    }
  }

  // Store the new customer in the hash table
  hashTable[hashIndex] = customerName;

  // Assign a queue number based on the current queue length
  let customerNumber = queue.length + 1;
  // Add the new customer to the queue
  queue.push({ number: customerNumber, name: customerName });

  console.log(`Added customer: ${customerName} with number ${customerNumber}`);
  console.log("Updated queue:", queue); // Display the updated queue
}

// Function to service a customer (remove them from the queue)
function serviceCustomer() {
  let serviceNumber = parseInt(prompt("Enter the number to service:"), 10); // Get the queue number from the user

  // Find the customer in the queue using their number
  let customerIndex = queue.findIndex((entry) => entry.number === serviceNumber);
  if (customerIndex !== -1) {
    let customer = queue.splice(customerIndex, 1)[0]; // Remove the customer from the queue

    // Remove the customer from the hash table
    for (let key in hashTable) {
      if (hashTable[key] === customer.name) {
        delete hashTable[key]; // Remove the entry from the hash table
        break;
      }
    }

    alert(`Serviced customer: ${customer.name}`); // Notify the user
    console.log(`Serviced customer: ${customer.name}`);
    console.log("Updated queue:", queue); // Display the updated queue
  } else {
    alert("Invalid number. Customer not found in queue."); // Handle invalid input
    console.log("Invalid number. Customer not found in queue.");
  }
}

// Function to display the current queue
function displayQueue() {
  console.log("Current queue:");
  // Iterate through the queue and display each customer's details
  queue.forEach(entry => {
    console.log(`Number: ${entry.number}, Name: ${entry.name}`);
  });
}

// Interactive menu for the queueing system
while (true) {
  // Display the menu and get the user's choice
  let choice = prompt(
    "Choose an action:\n1. Add customer\n2. Service customer\n3. Display queue\n4. Exit"
  );

  // Perform actions based on the user's choice
  if (choice === "1") {
    addCustomer(); // Add a new customer
  } else if (choice === "2") {
    serviceCustomer(); // Service a customer
  } else if (choice === "3") {
    displayQueue(); // Display the queue
  } else if (choice === "4") {
    alert("Exiting the queueing system."); // Exit the system
    break; // End the loop
  } else {
    alert("Invalid choice. Please try again."); // Handle invalid input
  }
}
