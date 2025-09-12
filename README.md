# AlgoTest API

A Node.js/Express API for algorithm testing and execution with real-time performance metrics.

## 🚀 Features

- **Algorithm Execution**: Run various algorithms including sorting, searching, and graph algorithms
- **Real-time Performance**: Get execution time and performance metrics
- **RESTful API**: Clean REST endpoints for easy integration
- **Docker Ready**: Fully containerized with multi-stage Docker build
- **Health Monitoring**: Built-in health checks and monitoring

## 🛠️ Tech Stack

- Node.js 18
- Express.js
- CORS enabled
- Helmet for security
- Morgan for logging

## 📁 Project Structure

```
algo-test-api/
├── server.js          # Main server file
├── package.json       # Dependencies
├── Dockerfile         # Multi-stage Docker build
├── .env              # Environment variables
└── README.md         # This file
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

3. **Access the API**:
   - API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Docker

1. **Build the image**:
   ```bash
   docker build -t algo-test-api .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3001:3001 algo-test-api
   ```

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### API Information
- `GET /api/test` - API information and available endpoints

### Algorithms
- `GET /api/algorithms` - List all available algorithms
- `POST /api/run-algorithm` - Execute an algorithm

### Example Usage

```bash
# Get available algorithms
curl http://localhost:3001/api/algorithms

# Run bubble sort
curl -X POST http://localhost:3001/api/run-algorithm \
  -H "Content-Type: application/json" \
  -d '{"algorithmId": 1, "input": [5,2,8,1,9]}'

# Run binary search
curl -X POST http://localhost:3001/api/run-algorithm \
  -H "Content-Type: application/json" \
  -d '{"algorithmId": 3, "input": {"array": [1,2,3,4,5], "target": 3}}'
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 🐳 Docker Deployment

The API is containerized with a multi-stage Docker build:

- **Build stage**: Installs all dependencies
- **Production stage**: Only production dependencies for smaller image

## 📊 Available Algorithms

1. **Bubble Sort** - Simple sorting algorithm (O(n²))
2. **Quick Sort** - Efficient sorting algorithm (O(n log n))
3. **Binary Search** - Search in sorted arrays (O(log n))
4. **Dijkstra's Algorithm** - Shortest path algorithm

## 🚀 Deployment

### AWS EKS
1. Build and push Docker image to ECR
2. Deploy using Kubernetes manifests
3. Configure ingress for external access

### Environment Variables for Production
- `NODE_ENV=production`
- `PORT=3001`
- `CORS_ORIGIN=https://your-domain.com`

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Happy Algorithm Testing! 🎉**
