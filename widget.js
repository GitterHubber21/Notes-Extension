document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('notes');
    const notesList = document.getElementById("notesList");
    const dropdownButton = document.getElementById("dropdownButton");
    let timeoutId;
    let lastOpenedNoteTitle = "";

    const noNotesMessage = document.createElement("div");
    noNotesMessage.textContent = "There are no saved notes.";
    noNotesMessage.style.color = "#808080";
    noNotesMessage.style.display = "none";
    noNotesMessage.className = "noteItem";
    noNotesMessage.style.fontSize = "16px";
    noNotesMessage.style.textAlign = "center";
    noNotesMessage.style.margin = "10px 0";
    notesList.appendChild(noNotesMessage);

    const updateNotesList = () => {
        chrome.storage.local.get(['allNotes'], (result) => {
            notesList.innerHTML = "";
            if (result.allNotes && result.allNotes.length > 0) {
                result.allNotes.forEach(note => {
                    const noteItem = document.createElement("div");
                    noteItem.className = "noteItem";
                    noteItem.textContent = note.title;

                    if (note.title === lastOpenedNoteTitle) {
                        noteItem.style.backgroundColor = "#4a9eff";
                    }

                    noteItem.addEventListener("click", () => {
                        document.getElementById("titleInput").value = note.title;
                        document.getElementById("notes").value = note.content;
                        notesList.style.display = "none";

                        document.querySelectorAll('.noteItem').forEach(item => {
                            item.style.backgroundColor = "";
                        });
                        noteItem.style.backgroundColor = "blue";
                        lastOpenedNoteTitle = note.title;
                    });

                    notesList.appendChild(noteItem);
                });
                noNotesMessage.style.display = "none";
            } else {
                notesList.appendChild(noNotesMessage);
                noNotesMessage.style.display = "block";
            }
        });
    };

    dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isVisible = notesList.style.display === "block";
        notesList.style.display = isVisible ? "none" : "block";

        if (!isVisible) {
            updateNotesList();
        }
    });

    document.addEventListener('click', () => {
        notesList.style.display = "none";
    });

    updateNotesList();
});

document.getElementById("saveButton").addEventListener("click", () => {
    const saveButton = document.getElementById("saveButton");
    const notes = document.getElementById("notes").value;
    const title = document.getElementById("titleInput").value;
    
    if (!title || !notes) {
        alert("Please enter both title and notes");
        return;
    }

    chrome.storage.local.get(['allNotes'], (result) => {
        let allNotes = result.allNotes || [];
        
        const existingNoteIndex = allNotes.findIndex(note => note.title === title);
        
        if (existingNoteIndex !== -1) {
            allNotes[existingNoteIndex] = {
                title: title,
                content: notes,
                timestamp: new Date().getTime()
            };
        } else {
            allNotes.push({
                title: title,
                content: notes,
                timestamp: new Date().getTime()
            });
        }

        chrome.storage.local.set({ 
            allNotes: allNotes
        }, () => {
            displayNotesList(allNotes);
            
            saveButton.style.backgroundColor = "white";
            saveButton.style.color = "green";
            saveButton.textContent = "Notes Saved";
            
            setTimeout(() => {
                saveButton.style.backgroundColor = "#4a9eff";
                saveButton.style.color = "white";
                saveButton.textContent = "Save Notes";
            }, 1000);

            document.getElementById("notes").value = "";
            document.getElementById("titleInput").value = "";
        });
    });
});

function displayNotesList(notes) {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const noteItem = document.createElement("div");
        noteItem.className = "noteItem";
        noteItem.textContent = note.title;
        
        noteItem.addEventListener("click", () => {
            document.querySelectorAll('.noteItem').forEach(item => {
                item.classList.remove('active');
            });
            
            noteItem.classList.add('active');
            
            document.getElementById("titleInput").value = note.title;
            document.getElementById("notes").value = note.content;
            
            document.getElementById("notesList").style.display = "none";
        });

        notesList.appendChild(noteItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let isDeleteMode = false;

    document.getElementById("deleteButton").addEventListener("click", () => {
        window.location.href = "delete.html";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('notes');
    let timeoutId;

    textarea.addEventListener('focus', (event) => {
        if (timeoutId) clearTimeout(timeoutId);
        return;
    });

    textarea.addEventListener('mousedown', (event) => {
        if (timeoutId) clearTimeout(timeoutId);
        return;
    });
});
