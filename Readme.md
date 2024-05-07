# tnsrio

### a tensorflow.js + redis implementation

## Certs

Run [generateCerts](./generateCerts.sh) to guide through setting up root ca and service certs for solt.
```bash
./generateCerts.sh
```

certs are generated under `~/tnsrio/certs` on the host machine.


## ENV

Export the following to your path:
```bash
export TENSOR_DB_HOST=<redis-host>
export TENSOR_DB_PORT=<redis-port>
export TENSOR_DB_USER=<redis-tensor-db-user>
export TENSOR_DB_PASS=<redis-tensor-db-pass>

source ~/.zshrc
```


## Deployment

In the `root` of the project, first build `Dockerfile.buildapi`, which creates a nodejs preimage shared between the different services:
```bash
./buildpreimages.sh
```

Then, to run a development cluster, deploy using docker through [startupDev](./startupDev.sh):
```bash
./startupDev.sh
```

To stop the services, run:
```bash
./stopDev.sh
```