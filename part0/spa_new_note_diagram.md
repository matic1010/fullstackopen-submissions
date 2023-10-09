# New note diagram in single page application

A diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

As an example, we try to add a note saying "Hello world!"

```mermaid
  sequenceDiagram
    participant Browser
    participant Server

    Note right of Browser: The browser adds the new note to the list, rerenders it and only then sends a POST request to the Server

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    deactivate Server

    Note right of Browser: payload: {"content": "Hello world!", date: "2023-10-09"}

```
