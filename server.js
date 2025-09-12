const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'algo-test-backend'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Welcome to AlgoTest API!',
    version: '1.0.0',
    endpoints: [
      'GET /health - Health check',
      'GET /api/test - Test endpoint',
      'GET /api/algorithms - List algorithms',
      'POST /api/run-algorithm - Run algorithm'
    ]
  });
});

app.get('/api/algorithms', (req, res) => {
  const algorithms = [
    {
      id: 1,
      name: 'Bubble Sort',
      description: 'Simple sorting algorithm with O(n²) time complexity',
      category: 'Sorting',
      difficulty: 'Easy'
    },
    {
      id: 2,
      name: 'Quick Sort',
      description: 'Efficient sorting algorithm with O(n log n) average time complexity',
      category: 'Sorting',
      difficulty: 'Medium'
    },
    {
      id: 3,
      name: 'Binary Search',
      description: 'Search algorithm for sorted arrays with O(log n) time complexity',
      category: 'Search',
      difficulty: 'Easy'
    },
    {
      id: 4,
      name: 'Dijkstra\'s Algorithm',
      description: 'Shortest path algorithm for weighted graphs',
      category: 'Graph',
      difficulty: 'Hard'
    }
  ];
  
  res.json({
    algorithms,
    count: algorithms.length
  });
});

app.post('/api/run-algorithm', (req, res) => {
  const { algorithmId, input } = req.body;
  
  if (!algorithmId || !input) {
    return res.status(400).json({
      error: 'Missing required fields: algorithmId and input'
    });
  }

  // Simulate algorithm execution
  const startTime = Date.now();
  
  // Simple simulation based on algorithm ID
  let result;
  switch (algorithmId) {
    case 1: // Bubble Sort
      result = bubbleSort([...input]);
      break;
    case 2: // Quick Sort
      result = quickSort([...input]);
      break;
    case 3: // Binary Search
      const { array, target } = input;
      result = binarySearch(array, target);
      break;
    case 4: // Dijkstra's
      result = { message: 'Dijkstra\'s algorithm simulation', path: 'A->B->C' };
      break;
    default:
      return res.status(400).json({ error: 'Invalid algorithm ID' });
  }
  
  const executionTime = Date.now() - startTime;
  
  res.json({
    algorithmId,
    input,
    result,
    executionTime: `${executionTime}ms`,
    timestamp: new Date().toISOString()
  });
});

// Algorithm implementations (simplified)
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API docs: http://localhost:${PORT}/api/test`);
});

module.exports = app;
