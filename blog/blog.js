function loadUserData(userId, callback) {
    setTimeout(() => {
        console.log("User data loaded");
        callback(null, { id: userId, name: "John" });
    }, 1000);
}

function loadUserPosts(userId, callback) {
    setTimeout(() => {
        console.log("User posts loaded");
        callback(null, [{ postId: 1 }, { postId: 2 }]);
    }, 1000);
}

function loadComments(postId, callback) {
    setTimeout(() => {
        console.log("Comments for post loaded");
        callback(null, ["Comment 1", "Comment 2"]);
    }, 1000);
}

// Callback hell
loadUserData(1, (err, userData) => {
    if (err) {
        console.error(err);
    } else {
        loadUserPosts(userData.id, (err, posts) => {
            if (err) {
                console.error(err);
            } else {
                loadComments(posts[0].postId, (err, comments) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Final Comments:", comments);
                    }
                });
            }
        });
    }
});

///////////////////////////////
function loadUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User data loaded");
            resolve({ id: userId, name: "John" });
        }, 1000);
    });
}

function loadUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User posts loaded");
            resolve([{ postId: 1 }, { postId: 2 }]);
        }, 1000);
    });
}

function loadComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Comments for post loaded");
            resolve(["Comment 1", "Comment 2"]);
        }, 1000);
    });
}

// Promise chaining
loadUserData(1)
    .then(userData => loadUserPosts(userData.id))
    .then(posts => loadComments(posts[0].postId))
    .then(comments => {
        console.log("Final Comments:", comments);
    })
    .catch(err => console.error("Error:", err));

    ///////////////////////////////////////////////////
    async function loadUserInfo() {
        try {
            const userData = await loadUserData(1);
            const posts = await loadUserPosts(userData.id);
            const comments = await loadComments(posts[0].postId);
            console.log("Final Comments:", comments);
        } catch (err) {
            console.error("Error:", err);
        }
    }
    
    loadUserInfo();
//////////////////////////////////////////
const fs = require('fs');

// Read file using a callback
fs.readFile('./input.txt', 'utf-8', (readErr, data) => {
    if (readErr) {
        console.error("Error reading file:", readErr.message);
    } else {
        console.log("File read successfully:", data);
        
        // Write file using a callback
        fs.writeFile('./output.txt', data, (writeErr) => {
            if (writeErr) {
                console.error("Error writing file:", writeErr.message);
            } else {
                console.log("File written successfully");
            }
        });
    }
});
///////////////////////////////////////
const fs = require('fs');

// Wrapping fs.readFile in a Promise
function readFilePromisified(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error(`Error reading file at ${path}: ${err.message}`));
            } else {
                resolve(data);
            }
        });
    });
}

// Wrapping fs.writeFile in a Promise
function writeFilePromisified(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(new Error(`Error writing file at ${path}: ${err.message}`));
            } else {
                resolve("File written successfully");
            }
        });
    });
}

// Using the promisified readFile and writeFile with chaining
readFilePromisified('./input.txt')
    .then(data => {
        console.log("File read successfully:", data);
        return writeFilePromisified('./output.txt', data); // Write the read data to another file
    })
    .then(result => {
        console.log(result); // Logs "File written successfully" if no errors
    })
    .catch(err => {
        console.error("Error:", err.message); // Catches and logs any read or write errors
    });
////////////////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');

// Wrapping fs.readFile in a Promise
function readFilePromisified(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error(`Error reading file at ${path}: ${err.message}`));
            } else {
                resolve(data);
            }
        });
    });
}

// Wrapping fs.writeFile in a Promise
function writeFilePromisified(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(new Error(`Error writing file at ${path}: ${err.message}`));
            } else {
                resolve("File written successfully");
            }
        });
    });
}

// Async function to handle reading and writing files
async function processFile() {
    try {
        // Read the file
        const data = await readFilePromisified('./input.txt');
        console.log("File read successfully:", data);

        // Write the file
        const result = await writeFilePromisified('./output.txt', data);
        console.log(result); // Logs "File written successfully" if successful
    } catch (err) {
        // Handle any errors
        console.error("Error:", err.message);
    }
}

// Call the async function
processFile();
/////////////////////////////////////////////////////
function asyncTask() {
    return new Promise(resolve => setTimeout(() => resolve("Task complete"), 2000));
}

Promise.resolve("Start")
    .then(result => {
        console.log(result); // "Start"
        asyncTask(); // Called, but not returned, so it won't wait
    })
    .then(nextResult => {
        console.log(nextResult); // Runs immediately, logging `undefined`
    });
//////////////////////////////
function asyncTask() {
    return new Promise(resolve => setTimeout(() => resolve("Task complete"), 2000));
}

Promise.resolve("Start")
    .then(result => {
        console.log(result); // Logs "Start"
        // No return here, so it implicitly returns `undefined`
    })
    .then(nextResult => {
        console.log(nextResult); // Logs `undefined` immediately
    });
