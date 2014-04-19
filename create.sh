#!/bin/sh

if [ $1 = 'app'  ] || [ $1 = 'microservice' ]
then
  cd "./$1s"
  if [ $2 ] && [ ! -d $2 ]
  then
    mkdir $2
    cp -r ../.default_vagrant_project/* "./$2"
  else
    echo 'É necessário dizer o nome do projeto e ele deve ser único'
  fi
  cd -
else
  echo 'O primeiro argumento deve ser "app" para criar uma aplição ou "microservice" para criar um serviço'
fi