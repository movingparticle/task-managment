# Task Manager App

This project is a simple task manager built only with HTML, CSS and JavaScript.
Tasks are stored locally in the browser using `localStorage` so you can copy the
files to any static host or even CodePen and manage your tasks without a server.

The interface has three tabs for organising tasks:

* **Importantes**
* **Diarias**
* **Recurrentes**

Each task lets you set a start and end date (optional for "Diarias" and "Recurrentes") and attach a file if needed.
In the "Diarias" tab you may use a time counter instead of dates to specify how long the task lasts.
The "Recurrentes" tab also lets you choose how often the task repeats, for example mensual o semanal.
Use the tabs to switch between categories and view only the tasks for that
section. Tasks can be marcadas como completadas mediante una casilla de
verificación y se muestran en verde cuando están listas. Un botón permite
eliminar todas las tareas completadas.
