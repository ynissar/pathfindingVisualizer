# pathfindingVisualizer

![Pathfinding Visualizer](./githubLogo.png)

Pathfinding Visualizer is a visualization tool used to illustrate how a computer may go about finding a path amongst obstacles using different commonly used graph traversal algorithms. I first became interested in pathfinding algorithms in my Algorithms and Data structures class where I learned about Breadth-first search, depth-first search and Dijkstra's algorithm. When learning about the different graph traversals, I found it difficult to visualize in a more practical context. So, I thought it would make for an interesting project to create a pathfinding visualizer using algorithms to find paths from the start point to the end point.

Pathfinding Visualizer is built using the React framework, javascript, HTML, and CSS.

## Algorithms

**Depth-First Search**
Depth-first search is an algorithm which starts at the start node (root node), and searches each possible path (branch) to the furthest extent before backtracking.

**Breadth-First Search**
Breadth-first search is an algorithm which searches each node at the present depth before continuing to the next depth.

**Dijkstra's Algorithm**
Dijkstra's Algorithm is similar to Breadth-first search in that it searches each node at the present depth before continuing to the next. However, it tracks each node's distance from the start node and the previous node. It uses these two additional metrics to constantly update the shortest path to each node. This gaurentees the shortest path from the start node to the end node.

**A\* Algorithm**
A* is similar to Dijkstra's algorithm with the addition of using heuristics to better guide its search. By assigning each of the possibly visitable nodes with an fscore (which is the distance it is from the start node and the distance from the end node), it can infer what the next best node to visit is. With the addition of heuristics, A* is able to reach the same conclusion as Dijkstra's (by finding the shortest path) while often having searched fewer nodes. This is why A\* is used so often in the computer science field.

## Challenges with this Project

The primary challenge with the Pathfinding Visualizer project was efficiency. With so many CSS animations going on at the same time, the page is prone to slowing down. To tackle this, I used lifecycle methods within the different components the control whether information inside of a node was only updated or rerendered. Using these methods I was able to create a much more smooth experience for the user and support a larger grid without worrying about lag.

## Future To-dos

- Add different distance calculations in regards to moving diagonally (Manhattan distance, euclidian distance, Chebyshev distance)
- Add Maze algorithms (Prim's, Kruskal's, Eller's, Recursive division, hunt-and-kill)
- Change grid size
- Drag and dropping ability for start and end nodes
- Implementing a hexgrid option
