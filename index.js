class chessGraph {
    constructor() {
        this.root = this.buildChessGraph()
        this.board = this.buildChessGraph()

    }


    buildChessGraph() {
        let b = {}

        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                b['[' + i + ',' + j + ']'] = this.createNeighbors(i, j)

            }
        }

        return b
    }

    createNeighbors(x, y) {
        const result = []

        if (x - 1 >= 0 && y - 2 >= 0) result.push('[' + (x-1) + ',' +  (y-2) + ']')
        if (x - 2 >= 0 && y - 1 >= 0) result.push('[' + (x-2) + ',' +  (y-1) + ']')

        if (x - 1 >= 0 && y + 2 <= 7) result.push('[' + (x-1) + ',' +  (y+2) + ']')
        if (x - 2 >= 0 && y + 1 <= 7) result.push('[' + (x-2) + ',' +  (y+1) + ']')

        if (x + 1 <= 7 && y + 2 <= 7) result.push('[' + (x+1) + ',' +  (y+2) + ']')
        if (x + 2 <= 7 && y + 1 <= 7) result.push('[' + (x+2) + ',' +  (y+1) + ']')

        if (x + 1 <= 7 && y - 2 >= 0) result.push('[' + (x+1) + ',' +  (y-2) + ']')
        if (x + 2 <= 7 && y - 1 >= 0) result.push('[' + (x+2) + ',' +  (y-1) + ']')

        return result
    }


    knightMoves(start, end) {
        if(!this.board[start] || !this.board[end]) {
            console.error("Invalid start or end node")
            return []
        }

        const queue = [start]

        const visited = {}
        visited[start] = { distance: 0, predecessor: null}

        while(queue.length > 0) {
            const currentNode = queue.shift();

            if (currentNode === end ) this.prettyPrint(this.reconstructPath(visited, start, end))

            for(const neighbor of this.board[currentNode]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = { distance: visited[currentNode].distance + 1, predecessor: currentNode}
                    queue.push(neighbor)
                }
            }
        }

    }

    reconstructPath(visited, start, end) {
        const path = []
        let currentNode = end

        while (currentNode !== start) {
            path.unshift(currentNode)
            currentNode = visited[currentNode].predecessor
        }

        path.unshift(start)

        return path
    }

    prettyPrint(array) {
        console.log("You made it in " + (array.length - 1) + " moves!, Here's your path:")
        for(const entry of array) {
            console.log(entry)
        }
    }
}

const board = new chessGraph();

board.knightMoves('[0,0]', '[7,7]')




