cd ./stockfish
wget https://github.com/official-stockfish/Stockfish/archive/refs/tags/sf_15.1.tar.gz
tar -xf ./sf_15.1.tar.gz
rm -f ./sf_15.1.tar.gz
cd ./Stockfish-sf_15.1/src
make net
make build ARCH=x86-64-bmi2
make install
rm -Rf ./Stockfish-sf_15.1/src
