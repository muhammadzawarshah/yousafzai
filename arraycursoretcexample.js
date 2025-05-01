// Route to fetch all members from the "members" collection
// app.get('/members', (req, res) => {
//     db.collection('members')  // Access the "members" collection in the database
//     .find()  // Retrieve all documents (members) from the collection
//     .sort({ name: 1 })  // Sort members alphabetically by name (1 = ascending order)
//     .toArray()  // Convert the retrieved data (cursor) into an array
//     .then((members) => {
//         res.status(200).json(members);  // Send the array of members as a JSON response
//     })
//     .catch(err => {
//         console.error(err);  // Log the error to the console
//         res.status(500).json({ err: "Couldn't fetch the data" });  // Send a 500 error response
//     });
// });


// Another version of the same route using forEach instead of toArray
// app.get('/members', (req, res) => {
//     let members = [];  // Create an empty array to store members
//     db.collection('members')  // Access the "members" collection
//     .find()  // Retrieve all members
//     .sort({name: 1})  // Sort them alphabetically by name
//     .forEach(member => members.push(member))  // Push each retrieved member into the array
//     .then(() => {
//         res.status(200).json(member)  // Send the members array as a JSON response
//     })
//     .catch(() => {
//         res.status(500).json({err: "Couldn't fetch the data"})  // Send a 500 error response
//     })
// });
