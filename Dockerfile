FROM     node:8.9.1-alpine

# Navigate to the build directory
ENV      BUILD_DIR="/build"
WORKDIR "${BUILD_DIR}"

# Lint and build the application
COPY    . "${BUILD_DIR}/"
RUN     npm install && \
        npm run eslint && \
        npm run test && \
        npm run build
