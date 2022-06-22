$platform=$OSTYPE;
echo $platform;
case $platform in
    msys*) source ./.venv/Scripts/activate;; # for windows
    darwin*) source ./.venv/bin/activate;; # for mac
esac
where python 
