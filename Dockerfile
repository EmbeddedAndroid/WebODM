FROM aarch64/python:3.5
MAINTAINER Tyler Baker <forcedinductionz@gmail.com>

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH $PYTHONPATH:/webodm
ENV LIBRARY_PATH=/usr/lib/aarch64-linux-gnu:/usr/lib

# Prepare directory
RUN mkdir /webodm
WORKDIR /webodm

# Install pip reqs
ADD requirements.txt /webodm/
RUN pip install -r requirements.txt

ADD . /webodm/

RUN git submodule init 
RUN git submodule update

# Install Node.js
RUN \
  curl https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-arm64.tar.xz > node-v6.9.5-linux-arm64.tar.xz && \
  tar -C . -xaf node-v6.9.5-linux-arm64.tar.xz && \
  rm node-v6.9.5-linux-arm64.tar.xz && \
  cd node-v6.9.5-linux-arm64 && \
  cp -R * /usr/local/

# Configure use of testing branch of Debian
RUN printf "Package: *\nPin: release a=stable\nPin-Priority: 900\n" > /etc/apt/preferences.d/stable.pref
RUN printf "Package: *\nPin: release a=testing\nPin-Priority: 750\n" > /etc/apt/preferences.d/testing.pref
RUN printf "deb     http://mirror.steadfast.net/debian/    stable main contrib non-free\ndeb-src http://mirror.steadfast.net/debian/    stable main contrib non-free" > /etc/apt/sources.list.d/stable.list
RUN printf "deb     http://mirror.steadfast.net/debian/    testing main contrib non-free\ndeb-src http://mirror.steadfast.net/debian/    testing main contrib non-free" > /etc/apt/sources.list.d/testing.list

# Install GDAL
RUN apt-get update && apt-get install -t testing -y binutils libproj-dev gdal-bin

WORKDIR /webodm/nodeodm/external/node-OpenDroneMap
RUN npm install

WORKDIR /webodm
RUN npm install -g webpack
RUN npm install
