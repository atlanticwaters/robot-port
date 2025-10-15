#!/bin/bash

# Robot Port Development Server Startup Script
# This script starts all required services for local development

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Robot Port - Development Startup${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Warning: pnpm not found, attempting to enable via corepack...${NC}"
    corepack enable
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Dependencies not found. Installing...${NC}"
    pnpm install
fi

# Check if .env.local exists
if [ ! -f "apps/web/.env.local" ]; then
    echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
    cp apps/web/.env.example apps/web/.env.local
    echo -e "${YELLOW}Please update apps/web/.env.local with your Prismic credentials${NC}"
fi

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    kill $(jobs -p) 2>/dev/null || true
    exit
}

trap cleanup SIGINT SIGTERM

# Start Next.js dev server
echo -e "${GREEN}Starting Next.js dev server (http://localhost:3000)...${NC}"
cd apps/web
pnpm dev &
NEXTJS_PID=$!

# Wait a moment for Next.js to start
sleep 2

# Start Slice Machine
echo -e "${GREEN}Starting Slice Machine (http://localhost:9999)...${NC}"
npx start-slicemachine --port 9999 &
SLICEMACHINE_PID=$!
SLICE_MACHINE_AVAILABLE=true

cd ../..

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}Services started successfully!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "\n${GREEN}Available services:${NC}"
echo -e "  ${BLUE}→${NC} Next.js:        ${YELLOW}http://localhost:3000${NC}"

if [ "$SLICE_MACHINE_AVAILABLE" = true ]; then
    echo -e "  ${BLUE}→${NC} Slice Machine:  ${YELLOW}http://localhost:9999${NC}"
fi
echo -e "\n${YELLOW}Press Ctrl+C to stop all services${NC}\n"

# Wait for all background jobs
wait
