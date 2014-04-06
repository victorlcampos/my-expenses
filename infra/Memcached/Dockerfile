FROM        ubuntu
MAINTAINER  Victor L. Campos "victorcampos@ufrj.br"
RUN         apt-get update
RUN         apt-get -y install memcached
EXPOSE      11211
CMD ["-m", "128"]
USER daemon
ENTRYPOINT memcached