const fs = require("fs")
const path = require("path")

// Create data directory and initialize projects file
const dataDir = path.join(process.cwd(), "data")
const projectsFile = path.join(dataDir, "projects.json")

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
  console.log("Created data directory")
}

// Initialize projects file if it doesn't exist
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify([], null, 2))
  console.log("Initialized projects.json file")
}

console.log("Data initialization complete")
