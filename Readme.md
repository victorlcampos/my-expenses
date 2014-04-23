# Gerenciador de projeto baseado em microserviços:
------------------------------------

## Estrutura de pastas:
------------------------------------
- Liberty
    + apps
        * Pacote responsável por armazenar as aplicações single pages, essas são as aplicações de entrada para o usuário, normalmente só contendo arquivos estáticos(sem backend).
    + microserviços
        * Pacote responsável por armazenar os micro serviços, normalmente apis rests sem nenhuma forma de visualização, um exemplo de microserviço seria de autentiticação, autorização, pagamento, etc.
    + grunt-init
        * Pacote responsável por armazenar templates de projetos contendo o esqueleto de alguns projetos básicos, como uma single page que mostra hello world na tela.
        * Essa pasta é compartilhada com todos apps e microserviços.
        * Dentro de uma app ou microserviço, basta executar
        ´´´shell
            grunt-init ~/.grunt-init/<nome do template>
        ´´´
    + puppet-modules
        * Pacote responsável por armazenar modulos do puppet que serão usados para subir a máquina virtual(Docker)

## Pré-Requisitos
-------------------------------------
1. Vagrant (http://www.vagrantup.com/)
2. Docker (https://www.docker.io)

## Como usar:
-------------------------------------
Dentro da pasta Liberty
```shell
    ./create.sh (app|microservice) <nome>
```
Esse comando irá criar a estrutura padrão de uma app ou microserviço, configurando o vagrant para usar o Docker como provider e o puppet como provision

Dentro da pasta da app|microservice criada
```shell
    vagrant up --provider=docker
    vagrant ssh
```
Esse comando irá subir uma container e instalar todos as as dependências descritas no arquivo default.pp contido na pasta manifest e depois se conectar via ssh a esse container criado.

## Exemplo:
-------------------------------------
1. Como criar uma single page app
    Dentro da pasta Liberty:
    ```sh
        ./create.sh app exampleApp
        cd app/exampleApp
    ```
    Adicionar o 'gulp', 'bower' e 'karma-cli' ao default.pp, ficando com algo mais ou menos assim a classe install_nodeJS:
    ```ruby
        class install_nodeJS {
          class { 'nodejs':
            version => 'stable'
          }

          package { [
              'grunt-init',
              'gulp',
              'bower',
              'karma-cli'
            ]:
            provider => npm,
            ensure => present,
            require => Class['nodejs']
          }
        }
    ```

    Levantar o container:
    ```sh
        vagrant up --provider=docker
        vagrant ssh
    ```
    Já dentro do container:
    ```sh
        cd /vagrant
        grunt-init ~/.grunt-init/single_page_template
        npm install
        gulp
    ```
    Pronto, se você acessar o seu browser: http://localhost:8080 você deve ver hello world escrito na tela