This is my first ever attempt at the Game Of Life Kata. I'm not all that enamoured with the solution, but it will probably do given that I went in completely naively. 

## Things I don't like:

* The main GameOfLife module is ugly and knows a lot about the implementation of Grid.
* The getNeighbours method is naive and repetitive. I intend to google other solutions to see where it might be improved.
* The try/catch in getCell is horrible and hacky, but seems to be the obvious solution to a billion and one guard clauses.
* Not enough encapsulation in Grid. PROTOTYPE ALL OF THE THINGS. etc.
* 1s and 0s everywhere. Would have perhaps been nicer to used a cell class.
* A cell class would have also offered potential solutions to the 'infinite grid' problem. It's still very much outside-in.
 
## Things I do actually like:

* The Grid class is easy to read, digest, and understand.
* The nextGeneration method, is the entire rules engine. In two simple to read clauses.
* To the consumer, there is only one entry point - one interface.
* This would be relatively simple to hook up to a UI and visualise the problem using setInterval.

# Kata synopsis:

From http://codingdojo.org/cgi-bin/index.pl?action=browse&diff=1&id=KataGameOfLife

You start with a 2 dimensional grid of cells, where each cell is either alive or dead. In this version of the problem, the grid is finite, and no life can exist off the edges. When calculating the next generation of the grid, follow these rules:

1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with more than three live neighbours dies, as if by overcrowding.
3. Any live cell with two or three live neighbours lives on to the next generation.
4. Any dead cell with exactly three live neighbours becomes a live cell.

You should write a program that can accept an arbitrary grid of cells, and will output a similar grid showing the next generation.

## Clues

The input starting position could be a file that looks like this:

    Generation 1
    4 8
    ........
    ....*...
    ...**...
    ........

And the output could look like this:

    Generation 2
    4 8
    ........
    ...**...
    ...**...
    ........
