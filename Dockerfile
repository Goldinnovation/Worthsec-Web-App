# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install dependencies (Copy the root-level package.json files)
COPY package*.json ./

# Step 4: Install the root-level dependencies
RUN npm install

# Step 5: Copy the entire server folder into the container
COPY server/ ./server/

# Step 6: Expose the port your Express server will run on (e.g., 3000)
EXPOSE 3000

# Step 7: Run the Express server from the server directory
CMD ["npm", "run", "start", "server"]