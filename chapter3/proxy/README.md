# proxy
Build the proxy image with `docker build -t proxy .` and then run the image with one of the two approaches bellow:

## Using `host` network
The easiest, perhaps not the cleanest, way to make the servers visible to the container. Simply run `docker run --network="host" proxy`.

## Using `bridge` network
You should avoid use the "host" network from docker, I did because I was lazy to dockerize the other applications. Ideally, you should create a network an add all the apps running in the same network. Then run the proxy image only with the required port. To run the command below, you'd have to change the `nginx.cong` to listen port 80.

`docker run -p 3000:80 proxy`