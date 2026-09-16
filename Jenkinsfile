pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        DOCKERHUB_USER  = "yourdockerhubuser"
        TAG             = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Images') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/resume-ai-backend:$TAG ./backend'
                sh 'docker build -t $DOCKERHUB_USER/resume-ai-frontend:$TAG ./frontend'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                sh 'docker push $DOCKERHUB_USER/resume-ai-backend:$TAG'
                sh 'docker push $DOCKERHUB_USER/resume-ai-frontend:$TAG'
            }
        }
        stage('Deploy') {
            steps {
                sh """
                    export DOCKERHUB_USER=$DOCKERHUB_USER
                    export TAG=$TAG
                    echo "DOCKERHUB_USER=$DOCKERHUB_USER" > .env
                    echo "TAG=$TAG" >> .env
                    docker compose -f docker-compose.prod.yml pull
                    docker compose -f docker-compose.prod.yml up -d
                """
            }
        }
    }
}