# MongoDB Document

## \_id

### Can you easily update the \_id field?

```text
No, you cannot easily update the _id field in MongoDB. Once set, you cannot update the value of the _id field or replace an existing document with a replacement document that has a different _id field value. The _id field acts as a primary key and must be unique within the collection to avoid duplicate key errors.

If you need to update the identifier for a document, you would typically create a new document with the desired identifier and delete the old document.
```

### The recommended way to store dates in MongoDB is to use the BSON Date data type

```text
The BSON Specification refers to the Date type as the UTC datetime and is a 64-bit integer. It represents the number of milliseconds since the Unix epoch, which was 00:00:00 UTC on 1 January 1970.

BSON: Binary Javascript Object Notation
```

> The timestamp data type should be left for internal usage in MongoDB.

> The Date type is the data type we'll want to use for application development.
