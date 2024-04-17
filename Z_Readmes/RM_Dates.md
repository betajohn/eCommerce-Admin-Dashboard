# Dates

## Getting current Date

### new Date()

```js
When no parameters are provided, the newly-created Date object represents the current date and time as of the time of instantiation. The returned "date's" timestamp is the same as the number returned by Date.now().
```

### new Date(yyyy, mm, dd)

```js
Given at least a year and month, this form of Date() returns a Date object whose component values (year, month, day, hour, minute, second, and millisecond) all come from the following parameters. Any missing fields are given the lowest possible value (1 for day and 0 for every other component). The parameter values are all evaluated against the local time zone, rather than UTC. Date.UTC() accepts similar parameters but interprets the components as UTC and returns a timestamp.
```

### Date.prototype.getTimezoneOffset()

Returns the difference, in minutes, between this date as evaluated in the UTC time zone, and the same date as evaluated in the local time zone.

```js
myDate.getTimezoneOffset(); // 240
nowUTC - nowLocal = 240
//if positive, we are behind UTC (i.e. to the left of the prime meridian. e.g. America).
//if negative, we are ahead of UTC (i.e to the right of the prime meridian. e.g. Asia)
```

### Date.getDate() vs Date.getUTCDate()

```js
Date.getDate(); // returns the day of the month in localtime
Date.getUTCDate(); // returns the day of the month in UTC
```

### Date.UTC()

```js
The Date.UTC() static method accepts parameters representing the date and time components similar to the Date constructor, but treats them as UTC. It returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
```

```js
new Date(2024, 00, 01); // Mon Jan 01 2024 00:00:00 GMT-0300 (Chile Summer Time)
new Date(Date.UTC(2024, 00, 01)); //Sun Dec 31 2023 21:00:00 GMT-0300 (Chile Summer Time)
```

### Getting the start of the day in UTC

```js
const todayUTC00AM = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
);
```
