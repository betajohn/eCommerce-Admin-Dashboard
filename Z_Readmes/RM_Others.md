# Other relevant knowledge acquired during development of this project

## GPS Coordinates

The GPS system makes use of the geographical lines of latitude and longitude. Both lines form an imaginary cartesian plane.

### World map is a Mercator projection

> cylindrical map

Conformal cylindrical map projection presented by Flemish geographer and cartographer Gerardus Mercator in 1569

### Getting GPS coordinates in JS

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
});
//-33.5282176 -70.7559424
```

### Latitude

X axys is the Ecuador.

Latitude comes from latin "latitudo", means width or breadth.

Latitude ranges from 0° to 90° in the north pole and from 0° to -90° in the south pole.

#### Why is it 90° on the poles?

```text
If you draw lines from the center of the sphere (0,0,0) to both, the ecuador and the north pole, you will form a perfect 90° degree angle.
```

### Longitude

Y axys is the prime meridian (Greenwich meridian, London).

Longitude comes from latin "longitudo", means "length" or "long measure".

#### Why is it 180° on the antimeridian (or the 180th meridian)?

```text
Unlike parallels, meridians don't cross the whole earth. They form half-circumferences (or semicircles).

Meridians and parallels are drawn on a two-dimensional cartesian plane.
Meridians cross the whole 2D plane from pole to pole.
```

## Time zones

MongoDB stores Dates in UTC by default

### UTC === GMT === UTC === Z time === Zulu time

Prior to 1972, this time was called Greenwich Mean Time (GMT) but is now referred to as Coordinated Universal Time or Universal Time Coordinated (UTC). It is a coordinated time scale, maintained by the Bureau International des Poids et Mesures (BIPM). It is also known as "Z time" or "Zulu Time".

Why Zulu?

```text
There are 24 timezones named Aplha to Zulu. Zulu is 'Z' in the NATO phonetic alphabet (military time).

They follow the x axys on a cartesian plane.
Each time zone to the right is +1 hour, Each zone to the left is -1 hour.
Greenwich is in the midle at UTC + 0.
Biggest time zone is UTC+12, just to the left of the antimeridian. Lowest time zone is UTC-12, just to the right.
```

Mean?

```text
mean(maths) = average.
```

Mean time?

```text
 The mean (average) solar time at the Royal Observatory, Greenwich in England.
```

Solar time?

```text
Solar time is a calculation of the passage of time based on the position of the Sun in the sky.

Traditionally, there are three types of time reckoning based on astronomical observations:
- Apparent solar time
- Mean solar time
- Sidereal time, which is based on the apparent motions of stars other than the Sun.
```

```text
A tall pole vertically fixed in the ground casts a shadow on any sunny day. At one moment during the day, the shadow will point exactly north or south (or disappear when and if the Sun moves directly overhead). That instant is called local apparent noon, or 12:00 local apparent time.

About 24 hours later the shadow will again point north–south, the Sun seeming to have covered a 360-degree arc around Earth's axis. When the Sun has covered exactly 15 degrees (1/24 of a circle, both angles being measured in a plane perpendicular to Earth's axis), local apparent time is 13:00 exactly; after 15 more degrees it will be 14:00 exactly.
```

> [!NOTE]
> Meridian?
>
> Astronomy: of or pertaining to midday or noon (noon means middle of the day).

Mean sun?

The problem is that in September the Sun takes less time (as measured by an accurate clock) to make an apparent revolution than it does in December. (apparent because we know that earth does the revolution around its own axys)

24 "hours" of solar time can be 21 seconds less or 29 seconds more than 24 hours of clock time.

This change is quantified by the equation of time, and is due to the eccentricity of Earth's orbit (as in, Earth's orbit is not perfectly circular, meaning that the Earth–Sun distance varies throughout the year), and the fact that Earth's axis is not perpendicular to the plane of its orbit (the so-called obliquity of the ecliptic).

The effect of this is that a clock running at a constant rate – e.g. completing the same number of pendulum swings in each hour – cannot follow the actual Sun; instead it follows an imaginary "mean Sun".

As of 2008, a mean solar day is about 86,400.002 SI seconds, i.e., about 24.0000006 hours.[3]

> [!NOTE]
>
> ```js
> seconds*minutes*hours = 60*60*24 = 86400
> ```

Mean solar time?

```text
Mean solar time is the hour angle of the mean Sun plus 12 hours.

This 12 hour offset comes from the decision to make each day start at midnight for civil purposes

The duration of daylight varies during the year but the length of a mean solar day is nearly constant, unlike that of an apparent solar day.

An apparent solar day can be 20 seconds shorter or 30 seconds longer than a mean solar day. Long or short days occur in succession, so the difference builds up until mean time is ahead of apparent time by about 14 minutes near February 6, and behind apparent time by about 16 minutes near November

The equation of time is this difference, which is cyclical and does not accumulate from year to year.
```
