# MongoDB

## Poject's Naming Convention

> Being consistent is far more important than what particular scheme you use.

```text
Database name: App's name e.g. JohnsCodes
Collection name (table): lowercase AND plural. e.g. users
                         no separators e.g. user_names => usernames
Document field name (column): lowercase AND uderscore_separator e.g. image_url
```

### Keep names short? (for optimization purposes)

> BE CONCISE

```texT
field_names?

In general, it is not necessary to use short field names, as field names represent a small fraction of the space used by a document. However, for small documents, shorter field names may save space.

collection names?

Do it but readability is top priority!

Using shorter collection names can also help optimize storage utilization, especially for collections with small documents.
```

## Documents

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

### use model.find().lean() instead of model.find()

```text
By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
```

## Aggregations

> In both mongoose and mongoDB driver, the result is always returned as an array, even if the aggregation pipeline returns a single document or no documents at all.

If there are no matches it will return an empty array.

```js
const aggregationResult = await Model.aggregate(queryThatFindsNoMatches);
console.log(aggregationResult[0]); // undefined
```

### Examples of usefull aggregations

Find orders from a specific day:

```js
// get orders from 2024-jan-22
// new Date() asks for s month index stating from 0 = january
const day = new Date(2024, 0, 22);

const ordersData = await OrdersModel.aggregate([
  {
    $match: {
      timestamp: { $gte: day },
    },
  },
  {
    $group: {
      _id: null, // In the $group stage output, the _id field is set to the group key for that document.
      totalSales: { $sum: '$cart.total' },
      totalProductsSold: { $sum: '$cart.items_number' },
      numberOfOrders: { $sum: 1 },
    },
  },
]);
```

Returns

```js
ordersData = [
  {
    _id: null,
    totalSales: 3608010.15,
    totalProductsSold: 23865,
    numberOfOrders: 1000,
  },
];
```

#### \_id field in group

- The \_id field is mandatory; however, you can specify an \_id value of null to calculate accumulated values for all the input documents as a whole.
