![Pathfinding Visualizer](./images/githubLogo.png)

# Pathfinding Visualizer

Pathfinding Visualizer is a visualization tool used to illustrate how a computer may go about finding a path amongst obstacles using different commonly used graph traversal algorithms. I first became interested in pathfinding algorithms in my Algorithms and Data structures class where I learned about Breadth-first search, depth-first search and Dijkstra's algorithm. When learning about the different graph traversals, I found it difficult to visualize in a more practical context. So, I thought it would make for an interesting project to create a pathfinding visualizer using algorithms to find paths from the start point to the end point.

## Algorithms

**Depth-First Search**
Depth-first search is an algorithm which starts at the start node (root node), and searches each possible path (branch) to the furthest extent before backtracking.

[![DFS Demo](https://j.gifs.com/DqWn9n.gif)](https://www.youtube.com/watch?v=yt2YfoFxD0E)

**Breadth-First Search**
Breadth-first search is an algorithm which searches each node at the present depth before continuing to the next depth.

[![BFS Demo](https://j.gifs.com/oZX4QK.gif)](https://www.youtube.com/watch?v=ICmpIT02RMs&ab_channel=YusufNissar)

**Dijkstra's Algorithm**
Dijkstra's Algorithm is similar to Breadth-first search in that it searches each node at the present depth before continuing to the next. However, it tracks each node's distance from the start node and the previous node. It uses these two additional metrics to constantly update the shortest path to each node. This gaurentees the shortest path from the start node to the end node.

[![Dijkstra Demo](https://j.gifs.com/k2X45X.gif)](https://www.youtube.com/watch?v=jQ687dtl248)

**A\* Algorithm**
A* is similar to Dijkstra's algorithm with the addition of using heuristics to better guide its search. By assigning each of the possibly visitable nodes with an fscore (which is the distance it is from the start node and the distance from the end node), it can infer what the next best node to visit is. With the addition of heuristics, A* is able to reach the same conclusion as Dijkstra's (by finding the shortest path) while often having searched fewer nodes. This is why A\* is used so often in the computer science field.

[![A* Demo](https://j.gifs.com/Z8rQV6.gif)](https://www.youtube.com/watch?v=BjWkyNcnc_k)

## Features

- shortest path visualization
- Implemented BFS, DFS, A\* and Dijkstra's algorithm
- moveable start and end nodes
- visually appealing animations

## Lessons Learned

Development of this project was unique as it involved applying concepts I have learned from my university's Data Structure's and Algorithms course.
Pathfinding Visualizer was also my first time using React.js in a project. During development, modularity became a key concept as I would tackle React's parent-child relationships and create a maintainable project.
Practicing these key computer science concepts is always a good thing, and I found this project to be a great place to do so.

## Optimizations

The most challenging aspect of developing Pathfinding Visualizer was efficiency. With so many CSS animations going on at the same time, the page is prone to slowing down. To tackle this, I used lifecycle methods within the different components the control whether information inside of a node was only updated or rerendered. Using these methods I was able to create a much more smooth experience for the user and support a larger grid without worrying about lag.

## Roadmap

- Add different distance calculations in regards to moving diagonally (Manhattan distance, euclidian distance, Chebyshev distance)

- Add Maze algorithms (Prim's, Kruskal's, Eller's, Recursive division, hunt-and-kill)

- Implementing a hexgrid option

- terrain generation (to illustrate real world application)

## Feedback

If you have any feedback, please reach out to me at yusufnissar8@gmail.com

## Run Locally

Clone the project

```bash
  git clone https://github.com/Waldohatesyou/pathfindingVisualizer.git
```

Go to the project directory

```bash
  cd pathfindingVisualizer/visualizer
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
