# ToDo List Backend Server Setup

### Goal: To Build a Backend that creates, retrieves, updates, and deletes comments

[Read how to test the endpoints on this server](EndpointsTest.md)

## Endpoints

    We'll only be focusing on Creating, Reading, & Deleting.
    We also won't be using views...for now.

    We'll be using mostly try..catch to simulate real world code
    ...also because we'll be throwing errors, including custom errors

### `Retrieval Endpoints (GET)`

- `GET` "/" : Just return text that says "Todo Server"
- `GET` "/todos": Show all todos
- `GET` "/todos/`:todoId`": Show todo based on id
  - `id` as number required
- `GET` "/todos/new": route to new todo form

### `Create & Destroy Endpoints (POST)`

- `POST` "/todos": Create a new todo
  - `title` required, `due-date` is optional
- `POST` "/todos/:todoId/delete": Delete task from "db" if it exists.

#### Comments

Comments are only going to have Creation and Deletion Properties. All comments **MUST** be associated with a post. If there's no post given, the server will return an `Error`

- `POST` "/:todoId/comments": Create a new comment for task
- `POST` "/:todoId/comments/:commentId/delete": Delete comment based on ID

## Models

To make it easier to read, we'll build a class for both the `Task` and `Comment`. the UID for both will follow an incremented number system.

### `TASK`

Every task will have:

- `id`: auto-incremented upon creation
- `title`: **Required** user-generated. name of the task.
- `due-date`: user-generated. defaults to null if not provided
- `comments`: auto-generated as an empty list upon creation

#### `Task Functions`

- `task.addComment(comment)`: Accepts `Comment` Object and adds to `task.comments`

- `Task.getInfo()`: Created to help retrieve all tasks upon request (includes all Comments)

### `COMMENT`

Every comment will have:

- `id`: auto-incremented upon creation
- `text`: **REQUIRED** user-generated:

### `ERROR400 extends ERROR`

- `message`: Custom message that describes 400 Error (400: Bad Request)
