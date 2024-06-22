# How to test these endpoints

- Run `npm install` in your terminal
- Once done, run `npm start` to start the server . The default port is 8000
- Head to **`Postman`**
- Find `New` and select `HTTP`
- Type `http://localhost:8000/ in the address bar

## Endpoints and What To Test

# Before We Start

Please take a moment to familiarize yoursel

### `Home Page` - GET "/"

- Just simply make sure you have a **`GET`** request selected
- While the server is running, hit `Send` on Postman
- You should see the following:
  - `Todo Backend Server` as text

### `View All Tasks` - GET "/todos"

#### **First Time!!**

- For the first time you should see the following:
  - `No todos!` as text
  - Go straight to `Create Tasks` - POST "/todos" for the next step

### `Create Tasks` - POST "/todos"

### **First Time!!**

- For the first time, press send with no body and see the following:
  - {"error": "Title is required!"}

### Right after the first time

- Head over to the body of the request in Postman
- Select "raw" as the body type (you'll be using JSON format)
- Type or copy in the following starting from line 1 in Postman:
  - **PSST**: If you're not reading the pretty version of this, copy from the curly braces

```JSON
    {
        "title": "Walk the dog"
    }
```

- Hit send and you should see:
  - The task you created as a JSON object

```JSON
    {
        "id": 1,
        "title": "Walk the dog",
        "dueDate": null,
        "comments": []
    }
```

- Now add another task with a date attached and hit send
  - `Tip`: For each new task, keep the same title key, just change the value, otherwise you'll duplicate the values

```JSON
    {
        "title": "Feed the Cat",
        "dueDate": "Now"
    }
```

- **`BONUS`**: Feel free to add your own todos! Again, all you need is a `title` and a `dueDate`

## Change your Request to `GET` (`View All Tasks` - GET "/todos") after you've done a couple of these and you should get the following:

```JSON

    {
        "1": {
            "task": "Walk the dog",
            "due_date": "Not set",
            "comments": "No comments found"
        },
        "2": {
            "task": "Feed the Cat",
            "due_date": "Now",
            "comments": "No comments found"
        },

        // ...plus any other todos
    }
```

### For the comments let use Task with the ID 2 to test our next endpoint

# `Comments`

### `Add Comment` - POST "/:todoId/comments"

#### Start by intentionally causing errors.

- `Wrong parameter type`
  - type `http://localhost:8000/feed-the-cat/comments` in Postman
    - this simulates the wrong `"type"` of request (Must be a number)
  - you should see the following:
    - "Task Id must be a number"
- `No comment text`

  - change `feed-the-cat` to `2` in the address bar in Postman
  - this time if you have anything in your body, delete it
    - this simulates not adding a comment
  - you should see the following:
    - "Comment text required"

- For the last time, add the following to your body in Postman

```JSON
    {
        "text": "My cat gets hangry"
    }
```

but change the 2 in the address bar to a high number like 100

- You should see the following:
  - "Task not found"

### Now let's do it right

- Change your high number back to 2 and resend the request
- This time you should see the following:

  - "comment created and added to Feed the Cat"

- Wanna do it again? Simply change your body to:

```JSON
    {
        "text": "No, I need to feed him now!"
    }
```

#### Feel free to add more comments by changing the text value

# Before we start deleting a post, go back to GET /todos and now see your comment(s)

You should see this:

```JSON
{
    "1": {
        "task": "Walk the dog",
        "due_date": "Not set",
        "comments": "No comments found"
    },
    "2": {
        "task": "Feed the Cat",
        "due_date": "Now",
        "comments": [
            "My cat gets hangry",
            "No, I need to feed him now!"
        ]
    }
}
```

### `Delete a Post` - DELETE "todos/:todoId/delete"

`Note: you can test how this can go wrong by simply adding higher numbers, so I'm skipping it`

### Let's delete `task 1`

- in the address bar type in `todos/1/delete`
- that's it. You'll get a message saying:
  - "Walk the dog successfully deleted."
- To check, head back to `/todos` as a `GET` request

# Take it further

There's a few things I neglected in my agenda, can you set up the route handlers for them?

You could set up endpoints to handle:

- Editing a task
- Editing/Deleting a comment
- Adding boolean values to a task to check if completed or not
- Sending tasks that have immediate due dates
- and so much more you can think of!

### The goal is not to not know exactly how I'm setting up my endpoints, but to get you thinking on all the things you could do with your backend

## Bugs?

Send an issue request, fork it out, or message me isaiah.vickers@outlook.com and I'll fix it! Thanks for viewing!
