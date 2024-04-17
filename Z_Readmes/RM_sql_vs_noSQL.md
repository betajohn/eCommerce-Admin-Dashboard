# SQL vs noSQL

> SQL and NoSQL databases each provide their own advantages and disadvantages

## SQL

```text
Structured Query Language (SQL) is a programming language that allows both technical and non-technically-minded users to query, manipulate, and change data in a relational database.

Organized into columns and rows within a table, SQL databases use a relational model that work best with well-defined structured data, such as names and quantities, in which relations exist between different entities. Within a SQL database, tables are linked through "foreign keys" that form relations between different tables and fields, such as customers and orders or employees and departments.

SQL databases are scalable vertically, meaning that you can increase the maximum load by adding further storage components like RAM or SSD. While in some cases this may mean that SQL databases are limited by the resources available on the server, cloud-based storage and other technologies can provide more scalability with SQL.
```

## noSQL

```text
NoSQL databases are non-relational databases that store data in a manner other than the tabular relations used within SQL databases. While SQL databases are best used for structured data, NoSQL databases are suitable for structured, semi-structured, and unstructured data. As a result, NoSQL databases don't follow a rigid schema but instead have more flexible structures to accommodate their data-types. Furthermore, instead of using SQL to query the database, NoSQL databases use varying query languages (some don't even have a query language).

NoSQL databases are scalable horizontally, meaning that they use multiple nodes in a cluster to handle increased workloads. This allows data architects to simply scale them by supplementing clusters with additional servers.

NoSQL non-relational databases work well with unstructured data and typically possess the following properties:

NoSQL is schema-less (no fixed data model).

NoSQL databases have a dynamic schema for unstructured data, making integrating data in certain types of applications easier and faster.

NoSQL uses non-tabular data models, which can be document-oriented, key-value, or graph-based. The most common NoSQL databases include MongoDB, Cassandra, HBase, Redis, Neo4j, and CouchDB.

NoSQL manages the scale and agility challenges you may face in modern applications, especially ones that handle large volumes of rapidly changing data. These demands exist across every industry vertical and application domain, including IoT, user analytics, personalization, ad tech, eCommerce, gaming, and social networks.
```

## Main differences between NoSQL and SQL

### Structure

```text
SQL databases are table based, while NoSQL databases can be document-oriented, key-value pairs, or graph structures. In a NoSQL database, a document can contain key value pairs, which can then be ordered and nested.
```

### Scalability

```text
SQL databases scale vertically, usually on a single server, and require users to increase physical hardware to increase their storage capacities. In effect, while cloud-storage options are available, SQL databases can be prohibitively expensive for businesses when dealing with vast amounts of big data.

NoSQL databases offer horizontal scalability, meaning that more servers simply need to be added to increase their data load. This means that NoSQL databases are better for modern cloud-based infrastructures, which offer distributed resources.
```

### Language

```text
SQL databases use SQL (Structured Query Language). NoSQL databases use JSON (JavaScript Object Notation), XML, YAML, or binary schema, facilitating unstructured data. SQL has a fixed-defined schema, while NoSQL databases are more flexible.
```

## Pros and cons of SQL

> SQL is the lingua franca of data. It's the language you’ll use most.

# pros

```text
  Pros of SQL:


SQL is widely understood and supported; most developers know it well.

SQL is extremely useful for simple aggregations over large datasets, such as calculating averages.

SQL is extremely useful for setting up simple ETL jobs, especially if the input and output formats are relational databases.

SQL is well-documented and easy to learn.
```

# const

```text
Cons of SQL:


The performance of SQL can be poor on substantial data sets because it requires multiple passes over the data to complete many operations (especially joins).

Debugging SQL can be complicated because it doesn't provide informative error messages.

The syntax of SQL tends to be verbose compared with programming languages like Python or R, which makes it harder to write complex transformations as scripts or functions.
```

## Pros and cons of NoSQL

```text
A significant benefit of NoSQL is that you don't have to define a schema upfront (or ever). This makes it easy to add new columns without dealing with all the issues involved in altering a vast table with lots of data already in it. It also means that if your queries don't require SQL, you can avoid the overhead of parsing and compiling SQL statements, modeling, and storing, providing an enormous performance boost when dealing with large amounts of data.
```

# pros

```text
Pros of NoSQL:


Flexible schema

Usable on distributed infrastructure platforms

Low-cost infrastructure

High availability and throughput
```

# cons

```text
Cons of NoSQL:


Less mature technology and difficult to manage

Limited query capabilities

Data inconsistency and poor performance in some complex scenarios
```

## When to use: SQL vs. NoSQL

### NoSQL

```text
You need high performance, particularly read performance: The way distributed NoSQL systems like Cassandra and Riak work means you can usually get very high read performance by adding more boxes. Some go so far as to automatically replicate data across nodes to ensure you always have plenty of copies of your data to access.

You need high availability (HA): Data replicates across nodes in a NoSQL system, so the failure of a single node does not necessarily result in data loss or downtime for your application. This also means you can easily add or remove nodes from clusters without impacting availability.
```

### SQL

```text
A relational database like SQL is a great option if you’re looking to build an application structured around a relationship between data tables. SQL also works well when you want to ensure your data is consistent across tables. However, relational databases aren’t always the best choice regarding flexibility or scaling.
```
