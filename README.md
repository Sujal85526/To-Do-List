# To-Do List App

Simple browser-based to‑do list with add, check/uncheck, delete, drag‑and‑drop reordering, and localStorage persistence.

Project structure
```
todo-list/
├─ index.html
├─ styles.css
├─ script.js
├─ README.md
└─ requirements.txt
```

Files
- index.html — main HTML
- styles.css — styling
- script.js — application logic
- README.md — this file
- requirements.txt — dependency hint (this is a static frontend project)

Features
- Add tasks
- Mark tasks complete/incomplete
- Delete tasks
- Drag & drop reorder
- Persist tasks to localStorage

Run / Development
- Open index.html directly in a browser
- Or serve with a simple static server:

Python 3:
python3 -m http.server 8000
Then open http://localhost:8000

Node (optional):
npx http-server .

Notes
- No build step required.
- Editing script.js and styles.css updates app behavior and styling.

