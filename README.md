# dynamic-meetings-algorithm
Algorithm to make digital meetings more dynamic. Like Gather.town, but just a simple algorithm that can be implemented in any meeting application.

## Goal
Digital meetings suck right? 30 people plus people crammed in one phone call. Only one person can speak. It's just not dynamic. Gather.town is a great example how it can be done better. But, it is an external program and lots of people use Microsoft Teams, Discord, Slack or Zoom.

The goal of this project is to create an universal algorithm that could be used in an implementation across all meeting applications.
- So everyone on Teams or Discord for example can enjoy meetings in which you can talk to your partner without disturbing the entire class.
- So everyone doesn't have to leave a call and call up a collegue to discuss something outside of a meeting.

I just want to see a digital meeting standard that is dynamic, not static.

## Get it working
Open the index.html file to get an empty screen. In this screen you can use your mouse to create and move circles.

It is all spaghetti code for now, which can obviously be improved.

## The current algorithm
All points are saved in an Array. There is one main point and as it is based on a client-side application. Each "client" has their own volume value related to others.

You can create points by clicking on a random spot on the screen. The first point you make is the "main" point.

Every other point you make is a different person in for example a digital meeting. The value on the line between points is the volume value.

The volume value ranges from 0 to 1. The value closest to the main point is 1. The distance between the main point and it's closest point is used as the benchmark of all the other points.

This can obviously be improved much more. Feel free to join our journey to make digital meetings way more fun.