

# Blank – prevent and Control the Browser Back Button

**Blank** helps you control what happens when someone clicks the **back button** in their browser.

This is useful when::
- You need very lite plugin (1kb)
- You don’t want users to accidentally leave the page
- You want to show a "back" action inside a modal, menu, or custom UI
- You need full control over the back button for better user experience

 
## How It Works

Normally, the browser's back button goes to the previous page.

**Blank** adds fake "pages" to the browser history. When users press back, it runs your function (like closing a modal) instead of leaving the page.

You can stack many actions — like layers. When the user presses back, the last added action runs first. Like going **back** through a path.
 

## How to Use

### 1. Add a new back action

```js
Blank.add(() => {
  // This runs when the user presses the back button
  closeModal();
});
```

You can call `Blank.add(...)` many times, like pushing layers (multi-level). Each one is removed when the back button is pressed.
 

### 2. Remove a back action

```js
Blank.remove(); // Removes the last one
```
 

### 3. Go back with code

```js
Blank.back(); // Same as pressing the back button
``` 

## Example: Single Level

```js
// Open a menu
openMenu();

// Add a back action that will close it
Blank.add(() => {
  closeMenu();
});
```

Now, if the user clicks the back button, the menu closes — and they stay on the same page!
 

## Example: Multi-Level Stack

```js
openModal();
Blank.add(() => {
  closeModal();
});

openSubMenu();
Blank.add(() => {
  closeSubMenu();
});

// Now back button will:
// 1. Close the submenu
// 2. Then close the modal
// 3. Then (if nothing else) leave the page
```
 

## Simple HTML Demo

- Shows a box when a button is clicked.
- Pressing the browser **back** button will hide the box instead of going to another page.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Blank Simple Demo</title>
  <style>
    #box {
      padding: 20px;
      background: lightblue;
      margin-top: 20px;
      display: none;
    }
  </style>
</head>
<body>
  <h2>Blank – Simple Back Button Control</h2>
  <button onclick="showBox()">Show Box</button>

  <div id="box">
    Hello! Press the back button to hide this box.
    <br><br>
    <button onclick="hideBox()">Hide Box</button>
  </div>

  <script>
    // Simple box show/hide
    function showBox() {
      document.getElementById("box").style.display = "block";
      Blank.add(() => {
        hideBox();
      });
    }

    function hideBox() {
      document.getElementById("box").style.display = "none";
      Blank.remove();
    }
  </script>
</body>
</html>
```
 

## License and Credits

<p>
  <img width="32px" src="https://raw.githubusercontent.com/seezaara/RocketV2ray/main/doc/logo.png">
  <a href="https://www.youtube.com/@seezaara">seezaara youtube</a>
  <br>
  <img width="32px" src="https://raw.githubusercontent.com/seezaara/RocketV2ray/main/doc/logo.png">
  <a href="https://t.me/seezaara">seezaara telegram</a>
</p> 
