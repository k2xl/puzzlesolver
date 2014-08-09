=======
puzzlesolver
============

Solves puzzles that involve putting shapes on a flat 2D board in a particular order

This JavaScript program attempts to find solutions for puzzles that involve 2D blocks on a board where the rows and columns of the board can not contain the same shape twice. The technique is a simple recursive function to find solutions (breadth first search).

I have a few puzzles from Israel that have the theme of placing tiles on a board in a specific way. I wanted to try and write a program to solve these types of puzzles. It is a bit more complicated than just a recursive search as tiles can be rotated.

The program only solves for the puzzle listed below, but eventually I want to get it to solve arbitrary puzzles by only requiring the pieces, the board size, and a function indicting "valid state"

## Example
![From www.thinkinggames.com](http://i.imgur.com/P9EZNzj.png)
(Source: www.thinkinggames.com)

The solution from running the program:
```
Starting
Solution # 1 = 
Place [["Star","Bull","Tria"]] at position 0,0
Place [["Yell"],["Tria"],["Squig"]] at position 3,0
Place [["Squig"],["Star"],["Yell"]] at position 4,0
Place [["Squig","Yell","Bull"]] at position 0,1
Place [["Bull"],["Yell"],["Tria"]] at position 0,2
Place [["Tria","Star"]] at position 1,2
Place [["Star","Squig","Bull"]] at position 1,3
Place [["Tria"],["Bull"]] at position 4,3
Place [["Squig","Yell","Star"]] at position 1,4

 [ [ 'Star', 'Bull', 'Tria', 'Yell', 'Squig' ],
  [ 'Squig', 'Yell', 'Bull', 'Tria', 'Star' ],
  [ 'Bull', 'Tria', 'Star', 'Squig', 'Yell' ],
  [ 'Yell', 'Star', 'Squig', 'Bull', 'Tria' ],
  [ 'Tria', 'Squig', 'Yell', 'Star', 'Bull' ] ] 

Solution # 2 = 
Place [["Star","Bull","Tria"]] at position 0,0
Place [["Squig"],["Tria"],["Yell"]] at position 3,0
Place [["Yell"],["Star"],["Squig"]] at position 4,0
Place [["Squig","Yell","Bull"]] at position 0,1
Place [["Bull"],["Yell"],["Tria"]] at position 0,2
Place [["Tria","Star"]] at position 1,2
Place [["Star","Squig","Bull"]] at position 1,3
Place [["Tria"],["Bull"]] at position 4,3
Place [["Squig","Yell","Star"]] at position 1,4

 [ [ 'Star', 'Bull', 'Tria', 'Squig', 'Yell' ],
  [ 'Squig', 'Yell', 'Bull', 'Tria', 'Star' ],
  [ 'Bull', 'Tria', 'Star', 'Yell', 'Squig' ],
  [ 'Yell', 'Star', 'Squig', 'Bull', 'Tria' ],
  [ 'Tria', 'Squig', 'Yell', 'Star', 'Bull' ] ] 

Solution # 3 = 
Place [["Star"],["Bull"],["Tria"]] at position 0,0
Place [["Squig"],["Yell"],["Bull"]] at position 1,0
Place [["Bull","Yell","Tria"]] at position 2,0
Place [["Tria"],["Star"]] at position 2,1
Place [["Star"],["Squig"],["Bull"]] at position 3,1
Place [["Squig"],["Yell"],["Star"]] at position 4,1
Place [["Yell","Tria","Squig"]] at position 0,3
Place [["Squig","Star","Yell"]] at position 0,4
Place [["Tria","Bull"]] at position 3,4

 [ [ 'Star', 'Squig', 'Bull', 'Yell', 'Tria' ],
  [ 'Bull', 'Yell', 'Tria', 'Star', 'Squig' ],
  [ 'Tria', 'Bull', 'Star', 'Squig', 'Yell' ],
  [ 'Yell', 'Tria', 'Squig', 'Bull', 'Star' ],
  [ 'Squig', 'Star', 'Yell', 'Tria', 'Bull' ] ] 

Solution # 4 = 
Place [["Bull"],["Tria"]] at position 0,0
Place [["Tria"],["Yell"],["Bull"]] at position 1,0
Place [["Squig","Yell","Star"]] at position 2,0
Place [["Star","Squig","Bull"]] at position 2,1
Place [["Squig"],["Star"],["Yell"]] at position 0,2
Place [["Tria","Star"]] at position 2,2
Place [["Yell"],["Tria"],["Squig"]] at position 4,2
Place [["Squig","Yell","Bull"]] at position 1,3
Place [["Star","Bull","Tria"]] at position 1,4

 [ [ 'Bull', 'Tria', 'Squig', 'Yell', 'Star' ],
  [ 'Tria', 'Yell', 'Star', 'Squig', 'Bull' ],
  [ 'Squig', 'Bull', 'Tria', 'Star', 'Yell' ],
  [ 'Star', 'Squig', 'Yell', 'Bull', 'Tria' ],
  [ 'Yell', 'Star', 'Bull', 'Tria', 'Squig' ] ] 


------
Found 4 solutions in 1.259 seconds (595885 iterations)...
```

## Possible Improvements
The algorithm could possibly be improved to prevent symmetric attempts from being attempted again.

Written by Danny Miller k2xl.com@gmail.com
