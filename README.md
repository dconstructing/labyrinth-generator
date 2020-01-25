# labyrinth-generator

Labyrinth generator for [The Magic Labyrinth](https://www.dreimagier.de/das-magische-labyrinth-band/) board game.

A hosted version of this software can find found at https://dconstructing.github.io/labyrinth-generator/

## Principles

The foundation of this generator is the underlying maze generator. It is used to generate a valid maze in which each space is accessible.

From that generated maze, random walls are removed until we get down to the desired number of walls.

Because we start from a valid maze, we are assured that the final maze will not contain any spaces that are isolated from the others.

## Legal

This software is in no way affiliated with [The Magic Labyrinth](https://www.dreimagier.de/das-magische-labyrinth-band/) or [Drei Magier](https://www.dreimagier.de/), the game's publisher.
