document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById("notesList");
    const doneButton = document.getElementById("doneButton");
    const noNotesMessage = document.createElement("div");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");
    const deleteModal = document.getElementById("deleteModal");
    let noteToDelete = null;

    noNotesMessage.textContent = "There are no saved notes.";
    noNotesMessage.style.color = "#808080";
    noNotesMessage.style.display = "none";
    noNotesMessage.style.fontSize = "larger";
    noNotesMessage.style.textAlign = "center";
    notesList.appendChild(noNotesMessage);

    function updateNotesList() {
        notesList.innerHTML = '';

        chrome.storage.local.get(['allNotes'], (result) => {
            if (result.allNotes && result.allNotes.length > 0) {
                result.allNotes.forEach(note => {
                    const noteItem = document.createElement("div");
                    noteItem.className = "noteItem";
                    noteItem.textContent = note.title;

                    noteItem.addEventListener("click", () => {
                        noteToDelete = note;
                        deleteModal.style.display = "flex";
                    });

                    notesList.appendChild(noteItem);
                });
                noNotesMessage.style.display = "none";
            } else {
                if (!notesList.contains(noNotesMessage)) {
                    notesList.appendChild(noNotesMessage);
                }
                noNotesMessage.style.display = "block";
            }
        });
    }

    updateNotesList();

    doneButton.addEventListener("click", () => {
        window.location.href = "widget.html";
    });
    confirmDeleteButton.addEventListener("click", () => {
        if (noteToDelete) {
            chrome.storage.local.get(['allNotes'], (result) => {
                let allNotes = result.allNotes || [];
                allNotes = allNotes.filter(n => n.title !== noteToDelete.title);
                
                chrome.storage.local.set({ allNotes: allNotes }, () => {
                    updateNotesList();

                    if (allNotes.length === 0) {
                        noNotesMessage.style.display = "block";
                    } else {
                        noNotesMessage.style.display = "none";
                    }

                    deleteModal.style.display = "none";
                    noteToDelete = null;
                });
            });
        }
    });

    cancelDeleteButton.addEventListener("click", () => {
        deleteModal.style.display = "none";
        noteToDelete = null;
    });
}); 