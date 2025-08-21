#!/bin/bash

# Production Deployment Script for VendorSoluce
set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "You're not on main branch (current: $CURRENT_BRANCH)"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_error "You have uncommitted changes. Please commit or stash them first."
    git status --short
    exit 1
fi

# Check if we're up to date with remote
git fetch origin
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)
if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    print_warning "Your local main branch is not up to date with remote."
    print_warning "Local: $LOCAL_COMMIT"
    print_warning "Remote: $REMOTE_COMMIT"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

print_status "Running pre-deployment checks..."

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Run type checking
print_status "Running TypeScript type checking..."
npm run type-check

# Run linting
print_status "Running ESLint..."
npm run lint

# Run tests
print_status "Running tests..."
npm run test -- --run

# Check for security vulnerabilities
print_status "Checking for security vulnerabilities..."
npm audit --audit-level=high

# Build the application
print_status "Building application for production..."
npm run build

# Analyze bundle size
print_status "Analyzing bundle size..."
npm run build:analyze

# Check build output
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

# Check for large files
LARGE_FILES=$(find dist -type f -size +500k | wc -l)
if [ "$LARGE_FILES" -gt 0 ]; then
    print_warning "Found $LARGE_FILES files larger than 500KB:"
    find dist -type f -size +500k -exec ls -lh {} \;
fi

# Create deployment manifest
print_status "Creating deployment manifest..."
cat > dist/deployment-manifest.json << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "commit": "$(git rev-parse HEAD)",
  "branch": "$(git branch --show-current)",
  "version": "$(node -p "require('./package.json').version")",
  "environment": "production",
  "buildId": "$(date +%s)"
}
EOF

# Validate environment variables
print_status "Validating environment configuration..."
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    print_error "Required environment variables not set:"
    print_error "VITE_SUPABASE_URL: ${VITE_SUPABASE_URL:-NOT SET}"
    print_error "VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY:-NOT SET}"
    exit 1
fi

print_status "Environment validation passed"

# Create .htaccess for Apache servers
print_status "Creating Apache configuration..."
cp public/.htaccess dist/

# Create robots.txt and sitemap
print_status "Copying SEO files..."
cp public/robots.txt dist/
cp public/sitemap.xml dist/

# Health check file
print_status "Creating health check endpoint..."
echo "OK" > dist/health.txt

# Final deployment summary
print_status "Deployment preparation completed successfully!"
echo
echo "📊 Deployment Summary:"
echo "  • Build completed: ✅"
echo "  • Type checking: ✅"
echo "  • Linting: ✅"
echo "  • Tests: ✅"
echo "  • Security audit: ✅"
echo "  • Bundle analysis: ✅"
echo "  • Environment validation: ✅"
echo
echo "📁 Build output: dist/"
echo "🔑 Environment: Production"
echo "📝 Commit: $(git rev-parse --short HEAD)"
echo "⏰ Timestamp: $(date)"
echo
echo "🚀 Ready for deployment to your hosting platform!"
echo
echo "Next steps:"
echo "  1. Upload contents of dist/ to your web server"
echo "  2. Configure your web server for SPA routing"
echo "  3. Set up monitoring and alerting"
echo "  4. Test the deployed application"
echo
echo "For detailed deployment instructions, see:"
echo "  https://docs.vendorsoluce.com/deployment"