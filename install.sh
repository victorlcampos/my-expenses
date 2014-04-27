#!/bin/sh

install_with_git() {
  cd "./$1s"
  if [ -d $2 ]; then
    echo "$2 is already installed"
  else
    git clone $3 $2
  fi
  cd -
}

install_puppet_module() {
  cd "./$1s"
  puppet module install --modulepath . $2
  cd -
}

while read line
do
  folder_type=$(echo $line | sed 's/\s\s*/ /g' | cut -d' ' -f1)
  folder_name=$(echo $line | sed 's/\s\s*/ /g' | cut -d' ' -f2)
  git_url=$(echo $line | sed 's/\s\s*/ /g' | cut -d' ' -f3)

  case $folder_type in
    "app"|"microservice"|"grunt-init-template" )
      install_with_git $folder_type $folder_name $git_url
      ;;
    "puppet-module" )
      install_puppet_module $folder_type $folder_name
      ;;
    * )
      echo "Dependencies invalid."
      ;;
  esac

done < "dependencies"