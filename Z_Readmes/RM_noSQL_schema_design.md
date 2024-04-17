# MongoDB Schema Design Best Practices

```text
One-to-One - Prefer key value pairs within the document
One-to-Few - Prefer embedding
One-to-Many - Prefer embedding
One-to-Squillions - Prefer Referencing
Many-to-Many - Prefer Referencing
```

```text
General Rules for MongoDB Schema Design:

- Rule 1: Favor embedding unless there is a compelling reason not to.
- Rule 2: Needing to access an object on its own is a compelling reason not to embed it.
- Rule 3: Avoid joins and lookups if possible, but don't be afraid if they can provide a better schema design.
- Rule 4: Arrays should not grow without bound. If there are more than a couple of hundred documents on the many side, don't embed them; if there are more than a few thousand documents on the many side, don't use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
- Rule 5: As always, with MongoDB, how you model your data depends entirely on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it.
```

> "How do I model a schema for my application?"

```text
> It depends
This is because document databases have a rich vocabulary that is capable of expressing data relationships in more nuanced ways than SQL

Is your app read or write heavy?
What data is frequently accessed together?
What are your performance considerations?
How will your data set grow and scale?
```

> Did you know that proper MongoDB schema design is the most critical part of deploying a scalable, fast, and affordable database?

## Schema Design Approaches – Relational vs. MongoDB

> Don't split up your data into neat little tables as you've always done before. This is no SQL. You lose out on many of the awesome features of MongoDB when you design your schema like an SQL schema.

### MongoDB schema design

> The only thing that matters is that you design a schema that will work well for your application

```text
Now, MongoDB schema design works a lot differently than relational schema design. With MongoDB schema design, there is:
No formal process
No algorithms
No rules
```

```text
Two different apps that use the same exact data might have very different schemas if the applications are used differently.
```

```text
When designing a schema, we want to take into consideration the following:

- Store the data
- Provide good query performance
- Require reasonable amount of hardware

Let's take a look at how we might model the relational User model in MongoDB.

{
    "first_name": "Paul",
    "surname": "Miller",
    "cell": "447557505611",
    "city": "London",
    "location": [45.123, 47.232],
    "profession": ["banking", "finance", "trader"],
    "cars": [
        {
            "model": "Bentley",
            "year": 1973
        },
        {
            "model": "Rolls Royce",
            "year": 1965
        }
    ]
}

You can see that instead of splitting our data up into separate collections or documents, we take advantage of MongoDB's document based design to embed data into arrays and objects within the User object. Now we can make one simple query to pull all that data together for our application.
```

## Embedding vs. Referencing

```text
MongoDB schema design actually comes down to only two choices for every piece of data. You can either embed that data directly or reference another piece of data using the $lookup operator (similar to a JOIN). Let's look at the pros and cons of using each option in your schema.
```

### Embedding: Advantages

```text
- You can retrieve all relevant information in a single query.
- Avoid implementing joins in application code or using $lookup
- Update related information as a single atomic operation.
  By default, all CRUD operations on a single document are ACID compliant
- However, if you need a transaction across multiple operations, you can use the
  transaction operator
- Though transactions are available starting 4.0, however, I should add that it's an anti-pattern to be overly reliant on using them in your application.
```

### Embedding: Limitations

```text
- Large documents mean more overhead if most fields are not relevant. You can increase query performance by limiting the size of the documents that you are sending over the wire for each query.
- There is a 16-MB document size limit in MongoDB. If you are embedding too much data inside a single document, you could potentially hit this limit.
```

### Referencing

```text
The other option for designing our schema is referencing another document using a document's unique object ID
and connecting them together using the $lookup operator. Referencing works similarly as the JOIN operator in an SQL query. It allows us to split up data to make more efficient and scalable queries, yet maintain relationships between data.
```

### Referencing: Advantages

```text
- By splitting up data, you will have smaller documents.
- Less likely to reach 16-MB-per-document limit
- Infrequently accessed information not needed on every query.
- Reduce the amount of duplication of data. However, it's important to note that data duplication should not be avoided if it results in a better schema.
```

### Referencing: Limitations

```text
In order to retrieve all the data in the referenced documents, a minimum of two queries or $lookup required to retrieve all the information.
```

## Rules for MongoDBschema design

### Rule 1: Favor embedding unless there is a compelling reason not to

> Prefer embedding for one-to-few relationships.

```text
One-to-many

With a schema that could potentially be saving thousands of sub parts, we probably do not need to have all of the data for the parts on every single request, but it's still important that this relationship is maintained in our schema. So, we might have a Products collection with data about each product in our e-commerce store, and in order to keep that part data linked, we can keep an array of Object IDs that link to a document that has information about the part.
```

### Rule 2: Needing to access an object on its own is a compelling reason not to embed it

### Rule 3: Avoid joins/lookups if possible, but don't be afraid if they can provide a better schema design

```text
One-to-Squillions

With MongoDB, tracking data within an unbounded array is dangerous, since we could potentially hit that 16-MB-per-document limit.
```

### Rule 4: Arrays should not grow without bound. If there are more than a couple of hundred documents on the "many" side, don't embed them; if there are more than a few thousand documents on the "many" side, don't use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed

```text
Many-to-Many

In order to preserve these relationships, there will need to be references from the one user to the many tasks and references from the one task to the many users.
```

### Rule 5: As always, with MongoDB, how you model your data depends – entirely – on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it

## Schema design anti-patterns

### 1.- Massive Arrays

```text
One of the rules of thumb when modeling data in MongoDB is data that is accessed together should be stored together. If you'll be retrieving or updating data together frequently, you should probably store it together.

Data is commonly stored together by embedding related information in subdocuments or arrays.

The problem is that sometimes developers take this too far and embed massive amounts of information in a single document.
```

> reading and building indexes on arrays gradually becomes less performant as array size increases.

> $lookup operations can be expensive, so it's important to consider how often you'll need to perform $lookup if you choose this option.

```text
- Flip the model -

Instead of embedding the employees in the buildings documents, we could flip the model and instead embed the buildings in the employees documents:

> The disadvantage with this approach is we have a lot of data duplication.

> Storage is cheap, so data duplication isn't necessarily a problem from a storage cost perspective
```

#### USE Extended reference pattern

```text
The extended reference pattern is a mixture of the previous two approaches where we duplicate some—but not all—of the data in the two collections. We only duplicate the data that is frequently accessed together.
```

> we should be mindful of duplicating data that will frequently be updated

### 2.- Massive Number of Collections

```text
Every collection in MongoDB automatically has an index on the _id field.

While the size of this index is pretty small for empty or small collections, thousands of empty or unused indexes can begin to drain resources. Collections will typically have a few more indexes to support efficient queries. All of these indexes add up.
```

```text
Additionally, the WiredTiger storage engine (MongoDB's default storage engine) stores a file for each collection and a file for each index. WiredTiger will open all files upon startup, so performance will decrease when an excessive number of collections and indexes exist.

We recommend limiting collections to 10,000 per replica set. When users begin exceeding 10,000 collections, they typically see decreases in performance.

To avoid this anti-pattern, examine your database and remove unnecessary collections. If you find that you have an increasing number of collections, consider remodeling your data so you have a consistent set of collections.
```

```text
Prefer bigger collections. Use up to 2 indexes per collection.
```

### 3.- Unnecessary Indexes

> Indexes are great (seriously!), but it's easy to get carried away and make indexes that you'll never actually use

```text
Indexes allow MongoDB to efficiently query data. If a query does not have an index to support it, MongoDB performs a collection scan, meaning that it scans every document in a collection. Collection scans can be very slow. If you frequently execute a query, make sure you have an index to support it.
```

#### We've discovered three big reasons why you should remove unnecessary indexes:

```text

1.- Indexes take up space. Each index is at least 8 kB and grows with the number of documents associated with it. Thousands of indexes can begin to drain resources.

2.- Indexes can impact the storage engine's performance. The WiredTiger storage engine stores a file for each collection and for each index. WiredTiger will open all files upon startup, so performance will decrease when an excessive number of collections and indexes exist.

3.- Indexes can impact write performance. Whenever a document is created, updated, or deleted, any index associated with that document must also be updated. These index updates negatively impact write performance.
```

> In general, we recommend limiting your collection to a maximum of 50 indexes.

```text
Creating indexes that support your queries is good. Creating unnecessary indexes is generally bad.

Unnecessary indexes reduce performance and take up space. An index is considered to be unnecessary if (1) it is not frequently used by a query or (2) it is redundant because another compound index covers it.
```

### 4.- Bloated Documents

> The opposite of the Bloated Documents Anti-Pattern is the Subset Pattern.

> MongoDB has a 16 MB document size limit. But should you use all 16 MBs? Probably not. Let's find out why.

```text
To keep your queries running as quickly as possible, WiredTiger (the default storage engine for MongoDB) keeps all of the indexes plus the documents that are accessed the most frequently in memory. We refer to these frequently accessed documents and index pages as the working set. When the working set fits in the RAM allotment, MongoDB can query from memory instead of from disk. Queries from memory are faster, so the goal is to keep your most popular documents small enough to fit in the RAM allotment.

The working set's RAM allotment is the larger of:
50% of (RAM - 1 GB)
256 MB.
```

```text
> working set -key concept

Her collection weight surpases the working set max weight. In order to fix it you either get more ram or reduce te collection weight.

Break up the collection into two collections: InspirationalWomen_Summary and InspirationalWomen_Details. Create a manual reference between the matching documents in the collections. Below are her new documents for Sally Ride.

She begins determining how to restructure her data to optimize for performance. The query on Leslie's homepage only needs to retrieve each woman's first name and last name. Having this information in the working set is crucial. The other information about each woman (including a lengthy bio) doesn't necessarily need to be in the working set.

// InspirationalWomen_Summary collection

{
   "_id": {
      "$oid": "5ee3b2a779448b306938af0f"
   },
   "inspirationalwomen_id": {
      "$oid": "5ec81cc5b3443e0e72314946"
   },
   "first_name": "Sally",
   "last_name": "Ride"
}

// InspirationalWomen_Details collection

{
   "_id": {
      "$oid": "5ec81cc5b3443e0e72314946"
   },
   "first_name": "Sally",
   "last_name": "Ride",
   "birthday": 1951-05-26T00:00:00.000Z,
   "occupation": "Astronaut",
   "quote": "I would like to be remembered as someone who was not afraid to do
             what she wanted to do, and as someone who took risks along the
             way in order to achieve her goals.",
   "hobbies": [
      "Tennis",
      "Writing children's books"
   ],
   "bio": "Sally Ride is an inspirational figure who... ",
   ...
}

In the example above, Leslie is duplicating all of the data from the InspirationalWomen_Summary collection in the InspirationalWomen_Details collection. You might be cringing at the idea of data duplication. Historically, data duplication has been frowned upon due to space constraints as well as the challenges of keeping the data updated in both collections. Storage is relatively cheap, so we don't necessarily need to worry about that here. Additionally, the data that is duplicated is unlikely to change very often.
```

```text
Sumary

Be sure that the indexes and the most frequently used documents fit in the RAM allocation for your database in order to get blazing fast queries. If your working set is exceeding the RAM allocation, check if your documents are bloated with extra information that you don't actually need in the working set. Separate frequently used data from infrequently used data in different collections to optimize your performance.
```

### 5.- Separating Data That is Accessed Together

```text
Normalizing data and splitting it into different pieces to optimize for space and reduce data duplication can feel like second nature to those with a relational database background. However, separating data that is frequently accessed together is actually an anti-pattern in MongoDB
```

```text
Much like you would use a join to combine information from different tables in a relational database, MongoDB has a $lookup operation that allows you to join information from more than one collection.

$lookup is great for infrequent, rarely used operations or analytical queries that can run overnight without a time limit. However, $lookup is not so great when you're frequently using it in your applications.

$lookup operations are slow and resource-intensive compared to operations that don't need to combine data from more than one collection.
```

> Data that is accessed together should be stored together.

```text
Instead of separating data that is frequently used together between multiple collections, leverage embedding and arrays to keep the data together in a single collection.

For example, when modeling a one-to-one relationship, you can embed a document from one collection as a subdocument in a document from another. When modeling a one-to-many relationship, you can embed information from multiple documents in one collection as an array of documents in another.
```

```text
-Extended Reference Pattern-
You could also use the Extended Reference Pattern to duplicate a portion of the data in each document from one collection in another.

-Subset Pattern-
You could use the Subset Pattern to duplicate a subset of the documents from one collection in another.
```

> Also, whenever you duplicate data, you are responsible for ensuring the duplicated data stays in sync.

### 6.- Case-Insensitive Queries Without Case-Insensitive Indexes

> Not having a case-insensitive index can create surprising query results and/or slow queries.

```text
You have three primary options when you want to run a case-insensitive query:

-Use $regex with the i option. Note that this option is not as performant because $regex cannot fully utilize case-insensitive indexes.

-Create a case-insensitive index with a collation strength of 1 or 2, and specify that your query uses the same collation.

-Set the default collation strength of your collection to 1 or 2 when you create it, and do not specify a different collation in your queries and indexes.
```
