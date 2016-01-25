FROM dockerfile/nodejs

ADD ./ /app
WORKDIR /app
RUN npm install

EXPOSE 9000

CMD ["/bin/bash", "/app/docker/run.sh"]
