# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install dependencies (Copy the root-level package.json files)
COPY package*.json ./

# Step 4: Install the root-level dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Generate the Prisma Client
RUN npx prisma generate


# Step 7: Build the application
RUN npm run build

# Step 9: Expose the port your server will run on (e.g., 3000)
EXPOSE 3000

# Step 10: Run the server from the dist directory
CMD ["node", "dist/server/app.js"]