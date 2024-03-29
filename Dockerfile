#실행하기 위한 환경만 필요하기 때문에 jre, 개발까지면 jdk
FROM openjdk:17-alpine

#컨테이너 안에 jar 파일은 app.jar 될꺼임
COPY target/sgg-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"]

#FROM jenkins/jenkins:latest

#ENV DEBIAN_FRONTEND noninteractive
#ENV DEBCONF_NOWARNINGS="yes"

#USER root
#RUN apt-get -y update && apt-get install -y --no-install-recommends \
#    vim \
#    apt-utils
#RUN apt-get install ca-certificates curl gnupg lsb-release -y
#RUN mkdir -p /etc/apt/keyrings
#RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
#RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
#RUN apt-get -y update
#RUN apt-get install docker-ce docker-ce-cli containerd.io docker-compose docker-compose-plugin -y
#RUN if [ -e /var/run/docker.sock ]; then chown jenkins:jenkins /var/run/docker.sock; fi
#RUN usermod -aG docker jenkins
#USER jenkins
