FROM openjdk:22-jdk
WORKDIR /app

COPY target/blog-app-backend.jar /app/blog-app-backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "blog-app-backend.jar"]