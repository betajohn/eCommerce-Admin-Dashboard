# Mongo & Mongoose Notes

## MongoDB

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

### Creating an ObjectID from a string

```ts
import mongoose from 'mongoose';

const _id: new mongoose.Types.ObjectId(input:string),
```

The string to create an ObjectId must be a 24 character hex string.

```text
A 24-character hexadecimal string consists of numbers 0-9 and letters A-F, totaling 24 characters. Hexadecimal is base-16 numbering system, meaning each digit can represent values from 0 to 15. In a 24-character string, each character represents 4 bits, so in total, it represents 96 bits of information.

// 661f007021251ab30391394c
```

#### Getting \_id programmatically

> Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.

In react we can't just pass mongoDB documents between server and client comps. Need to transform the \_id to string first.

```ts
const product = await MyModel.findOne({ price: 100 });

const product_id = product._id.toString(); // returns 660e6a3db6b44de9cd6bbbbb instead of ObjectId('660e6a3db6b44de9cd6bbbbb')
```

### working with Dates

MongoDB stores every date as UTC.

JS's new Date(mongoDBDate) creates a new date in local time format. Do this intead:

```ts
const product = await MyModel.findOne({ price: 100 });
const product_date = product.date;

const dateToPass = product_date.toUTCString(); // will be the exact same format as the date stored in mongoDB
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

## Indexes

Indexes support efficient execution of queries in MongoDB. Without indexes, MongoDB must scan every document in a collection to return query results.If an appropriate index exists for a query, MongoDB uses the index to limit the number of documents it must scan.

> Adding an index has negative performance impact for write operations.

Although indexes improve query performance, adding an index has negative performance impact for write operations. For collections with a high write-to-read ratio, indexes are expensive because each insert must also update any indexes.

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

#### Destructure an array of ducuments

```ts
const categories = await StoreConfigModel.aggregate([
  //no stages .- returns {_id:ObjectId('123'), categories:[{obj1},{obj2},{obj3},{obj4}]}
  { $unwind: '$categories' },
  /* returns: {id:ObjectId('123'), categories:{obj1}},
              {id:ObjectId('123'), categories:{obj2}},
              {id:ObjectId('123'), categories:{obj3}},
              {id:ObjectId('123'), categories:{obj4}}   
  */
  {
    $addFields: {
      name: '$categories.name',
      description: '$categories.description',
      _id: '$categories._id',
    },
  },
  /* returns:
      {id:categories._id, categories:{obj1},name:categories.name, description:categories.description},
      {id:categories._id, categories:{obj2},name:categories.name, description:categories.description},
      {id:categories._id, categories:{obj3},name:categories.name, description:categories.description},
      {id:categories._id, categories:{obj4},name:categories.name, description:categories.description},
  */
  { $project: { name: 1, description: 1, _id: 1 } },
  /*returns:
     {id:categories._id,name:categories.name, description:categories.description},
     {id:categories._id,name:categories.name, description:categories.description},
     {id:categories._id,name:categories.name, description:categories.description},
     {id:categories._id,name:categories.name, description:categories.description},
  */
]);
```

## Mongoose

### Schema

Use the anum propery in any string type declaration to create a string literal union.

```text
enum: Array, creates a validator that checks if the value is in the given array.
```

```ts
type status = 'active' | 'inactive;

const YourSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true // Optional, depending on your requirements
  }
});

```
