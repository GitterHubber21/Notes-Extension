The README and comments in the code were written with the help of AI.

# Meeting Note Assistant

## Overview

The Meeting Note Assistant is a Chrome extension designed to help users take notes during online meetings. It provides a user-friendly interface for creating, saving, and managing notes, making it easier to capture important information without interrupting the flow of the meeting. The extension supports various meeting platforms, including Zoom, Google Meet, Microsoft Teams, and Webex.

## Features

- **Note Creation**: Users can create notes with a title and content, allowing for organized and easily retrievable information.
- **Note Management**: The extension allows users to view, edit, and delete saved notes.
- **Dynamic Interface**: The interface is designed to be intuitive and responsive, ensuring a smooth user experience.
- **Popup Notifications**: The extension detects when a meeting is in progress and prompts users to take notes.
- **Storage**: Notes are stored locally using Chrome's storage API, ensuring that they are saved even after the browser is closed.

## Installation

To install the Meeting Note Assistant, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GitterHubber21/Notes-Extension.git
   cd meeting-note-assistant
   ```

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click on "Load unpacked" and select the directory where the extension files are located.

3. **Permissions**: The extension requires permissions to access active tabs, storage, and web navigation to function correctly.

## Usage

1. **Opening the Extension**: The extension will automatically open a popup when a meeting link is detected in the browser. You can also manually open the widget from the extension icon in the toolbar.

2. **Taking Notes**:
   - Click on the "Notes List" button to view existing notes.
   - Use the input fields to create a new note by entering a title and content.
   - Click "Save Notes" to store the note.

3. **Managing Notes**:
   - Click on any note in the list to load its content into the editor for editing.
   - Use the "Delete" button to remove notes you no longer need.

4. **Deleting Notes**: Navigate to the delete mode by clicking the "Delete" button. Select the notes you wish to delete and confirm the action.

## File Structure

The project consists of the following files:

- `manifest.json`: The configuration file for the Chrome extension, defining permissions, icons, and background scripts.
- `widget.html`: The main interface for taking notes.
- `popup.html`: The notification interface that appears when a meeting is detected.
- `delete.html`: The interface for managing and deleting notes.
- `widget.js`: The JavaScript file that handles the logic for the note-taking widget.
- `popup.js`: The script that manages the popup interface.
- `delete.js`: The script that handles the deletion of notes.
- `background.js`: The background script that detects meeting links and manages the popup behavior.
- `icon.png`: The icon used for the extension.

## Technologies Used

- **HTML/CSS**: For structuring and styling the user interface.
- **JavaScript**: For implementing the functionality of the extension.
- **Chrome Extensions API**: For accessing browser features such as storage and tab management.

## Contributing

Contributions are welcome! If you would like to contribute to the Meeting Note Assistant, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request.

