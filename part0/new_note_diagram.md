# New note diagram

A diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

As an example, we try to add a note saying "Hello world!"

```mermaid
  sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    deactivate Server
    note right of Browser: payload: {"note": "Hello world!"}


    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    note right of Browser: after the POST request, the page reloads entirely


    Server-->>-Browser: HTML document

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    Server-->>-Browser: CSS file

    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    Server-->>-Browser: JavaScript file

    Note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    Browser-->+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    Server-->>-Browser: [...,{"content": "Hello world!" "date": "2023-9-10"}]

    Note right of Browser: The browser starts executing the callback function to render the notes

```
