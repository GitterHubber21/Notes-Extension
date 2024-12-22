document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById("notesList");
    const doneButton = document.getElementById("doneButton");
    const noNotesMessage = document.createElement("div");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");
    const deleteModal = document.getElementById("deleteModal");
    let noteToDelete = null; // Variable to hold the note to delete

    noNotesMessage.textContent = "There are no saved notes.";
    noNotesMessage.style.color = "#808080";
    noNotesMessage.style.display = "none";
    noNotesMessage.style.fontSize = "larger"; // Make the text bigger
    noNotesMessage.style.textAlign = "center"; // Center the text horizontally
    notesList.appendChild(noNotesMessage);

    function updateNotesList() {
        // Clear the current notes list
        notesList.innerHTML = '';

        // Load saved notes and display them
        chrome.storage.local.get(['allNotes'], (result) => {
            if (result.allNotes && result.allNotes.length > 0) {
                result.allNotes.forEach(note => {
                    const noteItem = document.createElement("div");
                    noteItem.className = "noteItem";
                    noteItem.textContent = note.title;

                    // Add click handler to delete note
                    noteItem.addEventListener("click", () => {
                        noteToDelete = note; // Store the note to delete
                        deleteModal.style.display = "flex"; // Show the custom warning modal
                    });

                    notesList.appendChild(noteItem);
                });
                noNotesMessage.style.display = "none"; // Hide no notes message if there are notes
            } else {
                // Ensure noNotesMessage is appended to notesList if there are no notes
                if (!notesList.contains(noNotesMessage)) {
                    notesList.appendChild(noNotesMessage); // Append the message if not already present
                }
                noNotesMessage.style.display = "block"; // Show no notes message if there are no notes
            }
        });
    }

    // Call updateNotesList initially to load notes when the page is loaded
    updateNotesList();

    // Go back to the original widget page
    doneButton.addEventListener("click", () => {
        window.location.href = "widget.html"; // Redirect back to the original widget
    });
    confirmDeleteButton.addEventListener("click", () => {
        if (noteToDelete) {
            console.log("Deleting note:", noteToDelete); // Debugging log
            chrome.storage.local.get(['allNotes'], (result) => {
                let allNotes = result.allNotes || [];
                allNotes = allNotes.filter(n => n.title !== noteToDelete.title);
                
                chrome.storage.local.set({ allNotes: allNotes }, () => {
                    console.log("Notes after deletion:", allNotes); // Debugging log
                    updateNotesList(); // Refresh the notes list

                    // Check if there are no notes left
                    if (allNotes.length === 0) {
                        noNotesMessage.style.display = "block"; // Show no notes message
                    } else {
                        noNotesMessage.style.display = "none"; // Hide no notes message if there are notes
                    }

                    deleteModal.style.display = "none"; // Hide the modal after deletion
                    noteToDelete = null; // Clear the note to delete
                });
            });
        } else {
            console.log("No note selected for deletion."); // Debugging log
        }
    });

    // Handle cancel delete button
    cancelDeleteButton.addEventListener("click", () => {
        deleteModal.style.display = "none"; // Hide the modal
        noteToDelete = null; // Clear the note to delete
    });
}); 