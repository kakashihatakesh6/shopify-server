pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "yourdockerhubusername/node-app:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/kakashihatakesh6/shopify-server'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh '''
            echo $PASS | docker login -u $USER --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          sed "s|__IMAGE__|$DOCKER_IMAGE|g" k8s/deployment.yaml | kubectl apply -f -
          kubectl apply -f k8s/service.yaml
        '''
      }
    }
  }
}
