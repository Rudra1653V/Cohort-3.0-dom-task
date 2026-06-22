#  DOM Explorer - Task Manager

A fully interactive Task Manager Application built using **HTML**, **CSS**, and **Vanilla JavaScript**.

This project demonstrates real-world usage of DOM APIs, Event Handling, Event Delegation, Event Propagation, Attributes vs Properties, Browser Rendering Pipeline concepts, and Local Storage.

---

##  Live Demo

Deploy using:

- Netlify
- Vercel
- GitHub Pages

---

#  Features

## Task Management

- Add Task
- Edit Task
- Delete Task
- Complete Task
- Category Assignment

## Bonus Features

- Search Tasks
- Filter by Category
- Completed Task Counter
- Pending Task Counter
- Clear All Tasks
- Local Storage Persistence
- Theme Toggle (Dark / Light)

---

#  DOM APIs Used

## Element Creation

```javascript
document.createElement()
document.createTextNode()
```

## DOM Manipulation

```javascript
append()
prepend()
before()
after()
replaceWith()
remove()
```

## Attributes

```javascript
setAttribute()
getAttribute()
removeAttribute()
hasAttribute()
dataset
```

## Class Manipulation

```javascript
classList.add()
classList.remove()
classList.toggle()
```

---

#  Event Handling

Event listeners are used for:

```javascript
addEventListener()
```

Examples:

- Form Submission
- Theme Toggle
- Search
- Filter
- Task Actions

---

#  Event Delegation

Instead of attaching listeners to every task card:

```javascript
taskContainer.addEventListener("click", (e) => {
   // Handle edit/delete/complete
});
```

A single event listener is attached to the parent container.

Benefits:

- Better performance
- Less memory usage
- Handles dynamically created tasks

---

#  Event Bubbling

Event Bubbling occurs when an event starts at the target element and travels upward through its ancestors.

Example:

```text
Child Button
   ↓
Parent
   ↓
Grandparent
```

Console Output:

```text
Child Bubble
Parent Bubble
Grandparent Bubble
```

---

#  Event Capturing

Event Capturing occurs before bubbling.

The event travels from the outermost ancestor to the target.

Example:

```text
Grandparent
   ↓
Parent
   ↓
Child
```

Console Output:

```text
Grandparent Capture
Parent Capture
Child Capture
```

---

#  Attributes vs Properties

## Attribute

Stored in HTML.

Example:

```html
<input value="Hello">
```

Accessed using:

```javascript
input.getAttribute("value")
```

Returns:

```text
Hello
```

---

## Property

Stored in the DOM Object.

Accessed using:

```javascript
input.value
```

Returns the current live value.

If the user types:

```text
Hello World
```

Then:

```javascript
input.value
```

returns:

```text
Hello World
```

while:

```javascript
input.getAttribute("value")
```

still returns:

```text
Hello
```

---

#  Browser Rendering Pipeline

## Step 1: HTML

Browser receives HTML document.

↓

## Step 2: Parsing

Browser reads the HTML source code.

↓

## Step 3: Tokenization

HTML is converted into tokens.

Example:

```html
<h1>Hello</h1>
```

Becomes:

```text
Opening Tag
Text Node
Closing Tag
```

↓

## Step 4: DOM Tree

Tokens become a DOM Tree.

Example:

```text
html
 └── body
      └── h1
```

↓

## Step 5: CSS

Browser downloads CSS.

↓

## Step 6: CSSOM Tree

Browser creates CSS Object Model.

Example:

```text
body
 └── color: white
```

↓

## Step 7: Render Tree

DOM Tree + CSSOM Tree

↓

## Step 8: Layout

Browser calculates positions and sizes.

↓

## Step 9: Paint

Pixels are drawn on screen.

---

#  Data Attributes Used

Each task card stores:

```html
data-id
data-status
data-category
```

Example:

```html
<div
    data-id="101"
    data-status="pending"
    data-category="Study">
</div>
```

Accessed using:

```javascript
element.dataset.id
element.dataset.status
element.dataset.category
```

---

#  Local Storage

Tasks persist after page refresh.

Save:

```javascript
localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
);
```

Load:

```javascript
JSON.parse(
    localStorage.getItem("tasks")
);
```

---

#  Project Structure

```text
task-manager/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

#  Expected Learning Outcomes

By completing this project, you will understand:

- DOM Tree
- CSSOM Tree
- Render Tree
- Parsing
- Tokenization
- Event Handling
- Event Delegation
- Event Bubbling
- Event Capturing
- Attributes vs Properties
- Local Storage
- Dynamic DOM Manipulation

---

#  Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks or libraries were used.
