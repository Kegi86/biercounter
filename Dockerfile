FROM openjdk:11-jdk-slim

ADD target/biercounter-*.jar app.jar

ARG JVM_OPTS
ENV JVM_OPTS=${JVM_OPTS}

CMD java ${JVM_OPTS} -jar app.jar
