echo "Killing processes..."
npx kill-port 3000 3030
echo "Starting servers..."
pnpm dev & cd ../backend && pnpm dev
