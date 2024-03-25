# MongoDB

## Dcomuents

### \_id field

```text
In MongoDB, each document stored in a collection requires a unique _id field that acts as a primary key. If an inserted document omits the _id field, the MongoDB driver automatically generates an ObjectId for the _id field.

By default, Mongoose adds an _id property to your schemas.
When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document.

You can also overwrite Mongoose's default _id with your own _id. Just be careful: Mongoose will refuse to save a top-level document that doesn't have an _id, so you're responsible for setting _id if you define your own _id path.
MUST DEFINE _id ON YOUR SCHEMA IN ORDER TO OVERWRITE IT!!
```

### model_name file extension

```text
Make it model_name.js

Doesn't make sense for it to be a typescript file!!! you are typing a type lmaooo
squemas are just a type for monmgoDB documents!!
why would you type a schema? double work and not needed!!
```
