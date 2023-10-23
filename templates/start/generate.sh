#/bin/sh
yarn class-gen-sql gen config
yarn class-gen-sql gen initialize -f
yarn class-gen-sql swg auth -f
yarn class-gen-sql swg sql -f
yarn class-gen-sql gen all -f -a
yarn class-gen-sql gen auth User -f
yarn class-gen-sql gen index -f -a -sw
yarn class-gen-sql com web
yarn class-gen-sql com auth -f