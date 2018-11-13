# Use ubuntu base image
FROM ubuntu:latest

# Install sudo
RUN apt-get update && apt-get -y install sudo curl

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -

# Install dependencies
RUN sudo apt-get install git autoconf build-essential zlib1g-dev libjpeg-dev wget nodejs -y

# Get QPDF Source Code
RUN git clone https://github.com/qpdf/qpdf.git

# Set the working directory to /qpdf
WORKDIR /qpdf

# Build QPDF
RUN ./autogen.sh
RUN ./configure
RUN make
RUN make install

# Change workdir to root
WORKDIR /

# Add Environment Variables
RUN echo "export LD_LIBRARY_PATH='/usr/local/lib'" >> ~/.bash_profile

# Copy the current directory contents into the container at /pdf-protect
ADD . /pdf-protect

# Change workdir to pdf-protect
WORKDIR /pdf-protect

# Install dependencies
RUN npm i

# Make port 21014 available to the world outside this container
EXPOSE 21014

# Build Application
RUN npm run build

# Run app when the container launches
CMD ["node", "dist/index.js"]
