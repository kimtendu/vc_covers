VC_COVERS EXAMPLE
================

Hi. this is plugin for wordpress visual composer. U can make here different ways of blocks. 

Y can mix here a 3 types of content:
1) covers - its main output containers.
2) row - its row container that u can use for making columns inside covers block
3) cover Object - its a block object with all parameters  that u need.

For example, if u need block like on news page:


 b1  | b1 |  b2 - 1   |<br>
 b2 - 2   -| b1  | b1  |<br>
----------| b1 | b1   |<br>




u can use something like:<br />
[covers]<br>
[row]<br>
[column]<br>
[cover-object b1]<br>
[cover-object b1]<br>
[cover-object b2-2]<br>
[/column]<br>
[column]<br>
[cover-object b2-1]<br>
[cover-object b1]<br>
[cover-object b1]<br>
[cover-object b1]<br>
[cover-object b1]<br>
[/column]<br>
[/row]<br>
[/covers]<br>

if u need structure like that:

| b1 -3 |  b2 - 1-----|<br>
|---------| b1 | b1-2 |<br>
|---------| b1 |--------|  <br>


u can mix covers and row items like u want:
[covers]<br>
[cover-object b1-3]<br>
[/covers]<br>
[covers]<br>
[cover-object b2 - 1 ]<br>
[row]<br>
[column]<br>
[cover-object b1]<br>
[cover-object b1]<br>
[/column]<br>
[column]<br>
[cover-object b1-2]<br>
[/column]<br>
[/row]<br>
[/covers]
