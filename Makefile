.PHONY: help dev prod staging build clean logs

# Default target
help:
	@echo "Wedding Frontend Docker Commands:"
	@echo "  make dev      - Start development environment"
	@echo "  make prod     - Start production environment"
	@echo "  make staging  - Start staging environment" 
	@echo "  make build    - Build all images"
	@echo "  make clean    - Clean up containers and images"
	@echo "  make logs     - Show logs"
	@echo "  make stop     - Stop all services"

# Development environment
dev:
	docker-compose --profile development up --build

# Production environment
prod:
	docker-compose --profile production up --build -d

# Staging environment
staging:
	docker-compose --profile staging up --build

# Build images without starting
build:
	docker-compose build

# Clean up everything
clean:
	docker-compose down -v --rmi all --remove-orphans
	docker system prune -f

# Show logs
logs:
	docker-compose logs -f

# Stop all services
stop:
	docker-compose down

# Install dependencies locally
install:
	npm install

# Run locally without Docker
local:
	npm run dev