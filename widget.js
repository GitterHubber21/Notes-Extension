document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('notes');
    const notesList = document.getElementById("notesList");
    const dropdownButton = document.getElementById("dropdownButton");
    let timeoutId;
    let lastOpenedNoteTitle = ""; // Store the title of the last opened note

    // Create a message element for no notes
    const noNotesMessage = document.createElement("div");
    noNotesMessage.textContent = "There are no saved notes.";
    noNotesMessage.style.color = "#808080"; // Set the text color to gray
    noNotesMessage.style.display = "none"; // Initially hide the message
    noNotesMessage.className = "noteItem"; // Use the same class for styling
    noNotesMessage.style.fontSize = "16px"; // Set the font size to make it bigger
    noNotesMessage.style.textAlign = "center"; // Center the text
    noNotesMessage.style.margin = "10px 0"; // Add some margin for spacing
    notesList.appendChild(noNotesMessage); // Append the message to the notes list

    // Function to update the notes list
    const updateNotesList = () => {
        chrome.storage.local.get(['allNotes'], (result) => {
            notesList.innerHTML = ""; // Clear existing list
            if (result.allNotes && result.allNotes.length > 0) {
                result.allNotes.forEach(note => {
                    const noteItem = document.createElement("div");
                    noteItem.className = "noteItem";
                    noteItem.textContent = note.title;

                    // Highlight the last opened note
                    if (note.title === lastOpenedNoteTitle) {
                        noteItem.style.backgroundColor = "#4a9eff"; // Set background color to blue
                    }

                    // Add click handler to load note
                    noteItem.addEventListener("click", () => {
                        // Load note content
                        document.getElementById("titleInput").value = note.title;
                        document.getElementById("notes").value = note.content;
                        notesList.style.display = "none"; // Hide dropdown after selection

                        // Highlight the selected note item
                        document.querySelectorAll('.noteItem').forEach(item => {
                            item.style.backgroundColor = ""; // Reset background color
                        });
                        noteItem.style.backgroundColor = "blue"; // Set background color to blue
                        lastOpenedNoteTitle = note.title; // Store the last opened note title
                    });

                    notesList.appendChild(noteItem);
                });
                noNotesMessage.style.display = "none"; // Hide message if notes exist
            } else {
                notesList.appendChild(noNotesMessage); // Append the no notes message to the list
                noNotesMessage.style.display = "block"; // Show message if no notes
            }
        });
    };

    // Toggle dropdown when button is clicked
    dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        const isVisible = notesList.style.display === "block";
        notesList.style.display = isVisible ? "none" : "block";

        // Update the notes list when opening the dropdown
        if (!isVisible) {
            updateNotesList();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        notesList.style.display = "none"; // Hide dropdown
    });

    // Load saved notes on widget load
    updateNotesList();
});

// Store notes in an array within chrome storage
document.getElementById("saveButton").addEventListener("click", () => {
    const saveButton = document.getElementById("saveButton");
    const notes = document.getElementById("notes").value;
    const title = document.getElementById("titleInput").value;
    
    if (!title || !notes) {
        alert("Please enter both title and notes");
        return;
    }

    // Get existing notes first
    chrome.storage.local.get(['allNotes'], (result) => {
        let allNotes = result.allNotes || [];
        
        // Find index of existing note with same title
        const existingNoteIndex = allNotes.findIndex(note => note.title === title);
        
        // If note with same title exists, update it
        if (existingNoteIndex !== -1) {
            allNotes[existingNoteIndex] = {
                title: title,
                content: notes,
                timestamp: new Date().getTime()
            };
        } else {
            // Add new note if title doesn't exist
            allNotes.push({
                title: title,
                content: notes,
                timestamp: new Date().getTime()
            });
        }

        // Save to chrome storage
        chrome.storage.local.set({ 
            allNotes: allNotes
        }, () => {
            // Update the notes list
            displayNotesList(allNotes);
            
            // Temporary button modification
            saveButton.style.backgroundColor = "white";
            saveButton.style.color = "green";
            saveButton.textContent = "Notes Saved";
            
            // Reset after 1 second
            setTimeout(() => {
                saveButton.style.backgroundColor = "#4a9eff";
                saveButton.style.color = "white";
                saveButton.textContent = "Save Notes";
            }, 1000);

            // Clear the inputs
            document.getElementById("notes").value = "";
            document.getElementById("titleInput").value = "";
        });
    });
});

// Function to display notes in the list
function displayNotesList(notes) {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = ""; // Clear existing list

    notes.forEach((note, index) => {
        const noteItem = document.createElement("div");
        noteItem.className = "noteItem";
        noteItem.textContent = note.title;
        
        // Add click handler to load note
        noteItem.addEventListener("click", () => {
            // Remove active class from all notes
            document.querySelectorAll('.noteItem').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked note
            noteItem.classList.add('active');
            
            // Load note content
            document.getElementById("titleInput").value = note.title;
            document.getElementById("notes").value = note.content;
            
            // Hide dropdown after selection
            document.getElementById("notesList").style.display = "none";
        });

        notesList.appendChild(noteItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let isDeleteMode = false;

    document.getElementById("deleteButton").addEventListener("click", () => {
        window.location.href = "delete.html"; // Navigate to delete mode
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('notes');
    let timeoutId;

    // Function to update window size
    

    // Prevent window resizing when focusing on the textarea
    textarea.addEventListener('focus', (event) => {
        // Clear any existing timeout to prevent resizing
        if (timeoutId) clearTimeout(timeoutId);
        // Prevent window resizing by returning early
        return; // Add this line to prevent further execution
    });

    // Prevent window resizing when clicking into the textarea
    textarea.addEventListener('mousedown', (event) => {
        // Clear any existing timeout to prevent resizing
        if (timeoutId) clearTimeout(timeoutId);
        // Prevent window resizing by returning early
        return; // Add this line to prevent further execution
    });

    // Load saved notes and other initialization code...
});

  
