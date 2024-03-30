# Database Terms

## Concurrency & mongoDB prevention of exploits/hacks

> Occurring or existing simultaneously

```text
MongoDB allows multiple clients to read and write the same data. To ensure consistency, MongoDB uses locking and concurrency control to prevent clients from modifying the same data simultaneously.

Writes to a single document occur either in full or not at all, and clients always see consistent data.

```

### Concurrency control

```text
Concurrency control ensures that database operations can be executed concurrently without compromising correctness. Pessimistic concurrency control, such as that used in systems with
locks
, blocks any potentially conflicting operations even if they may not conflict. Optimistic concurrency control, the approach used by WiredTiger, delays checking until after a conflict may have occurred, ending and retrying one of the operations in any
write conflict.
```

### What type of locking does MongoDB use?

```text
MongoDB uses multi-granularity locking [1] that allows operations to lock at the global, database or collection level, and allows for individual storage engines to implement their own concurrency control below the collection level (e.g., at the document-level in WiredTiger).

MongoDB uses reader-writer locks that allow concurrent readers shared access to a resource, such as a database or collection.
```

### Yielding the lock

```text
 Releasing a lock temporarily to allow other processes or threads to access the locked resource.
 When a process or thread acquires a lock on a resource (such as a database record or a portion of memory), it gains exclusive access to that resource for performing its operations.

 However, if another process or thread needs access to the same resource, it must wait until the lock is released. In some concurrency control mechanisms, the process holding the lock may voluntarily release it under certain conditions. This act of releasing the lock temporarily, allowing other processes to proceed, is known as "yielding the lock."

 Yielding the lock can be beneficial for improving system concurrency and avoiding potential deadlocks, where multiple processes are waiting indefinitely for each other to release locks. By voluntarily releasing locks when they're not strictly needed, a system can allow other processes to make progress, potentially reducing overall system latency and improving throughput.

In summary, "yielding the lock" means temporarily releasing exclusive access to a resource, enabling other processes or threads to access it, and potentially improving system concurrency and performance.
```

## ACID

> In fact, MongoDB is an ACID-compliant database. As of MongoDB 4.0, there is even support for multi-document ACID transactions when required. Version 4.2 even brought distributed multi-document ACID transactions for even more flexibility.

```text
Atomicity: Atomicity ensures that a database transaction is treated as a single unit of work, which either succeeds completely or fails completely. In other words, if one part of the transaction fails, the entire transaction is rolled back to its original state, maintaining data consistency.

Consistency: Consistency guarantees that a database remains in a valid state before and after a transaction. This means that all data modifications must adhere to any defined rules or constraints, such as integrity constraints, foreign key constraints, or domain constraints.

Isolation: Isolation ensures that the execution of transactions concurrently does not interfere with each other. Each transaction appears to be executed in isolation, regardless of other transactions executing concurrently. Isolation prevents phenomena like dirty reads, non-repeatable reads, and phantom reads.

Durability: Durability ensures that once a transaction is committed, the changes it made to the database persist even in the event of system failures, crashes, or power outages. These changes are permanently written to non-volatile storage, typically disk, ensuring that they are not lost.

ACID properties are essential for maintaining data integrity, reliability, and consistency in database systems, especially in environments where multiple transactions may be occurring concurrently. Database management systems (DBMS) typically implement mechanisms to ensure ACID properties, which are crucial for ensuring the reliability and correctness of data operations.
```

```text
However, MongoDB’s data modeling best practice suggests storing related data together in a single document using a variety of data types, including arrays and embedded documents. So, a lot of the time, ACID is not required as it is a single-document transaction.
```

### Normalizing data

```text
In relational databases, especially large ones, you need to arrange entries so that other maintainers and administrators can read them and work on them. This is why database normalization is important.

In simple words, database normalization entails organizing a database into several tables in order to reduce redundancy. You can design the database to follow any of the types of normalization such as 1NF, 2NF, and 3NF.
```

## Collation

```text
collation: the act of collating. | Fact or result of being collated.
  -other> light meal (colacion in spanish)
collate: to arrange (pages) in their proper order | to compare (texts, etc.) critically

```

> Collation is set of rules maintained that instruct database on how to sort and compare data

```text
Collation is the set of rules that define how data characters are stored, compared and sorted in the database. there are multiple ways to set these rules. You can set collation rules on Server level, database level or even on column level.
```

```text
How database is structured, how stored procedures, table structures, queries are written, how you maintain your data plays a vital role in the performance of the project.
```

#### Collation in mongoDB

```text
Collation allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.

You can specify collation for a collection or a view, an index, or specific operations that support collation.
```

#### Colation document

A collation document has the following fields:

```text
{
   locale: <string>,
   caseLevel: <boolean>,
   caseFirst: <string>,
   strength: <int>,
   numericOrdering: <boolean>,
   alternate: <string>,
   maxVariable: <string>,
   backwards: <boolean>
}
```
