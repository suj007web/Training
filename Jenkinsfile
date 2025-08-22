pipeline {
  agent { label 'themes' }

  environment {
    REGISTRY = "docker.io/suj007web"
    BACKEND_IMAGE = "my-backend"
    FRONTEND_IMAGE = "my-frontend"
    TAG = "latest"
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: 'master']],
          userRemoteConfigs: [[
            url: 'git@github.com:suj007web/Training.git',
            credentialsId: 'git-ssh-key'
          ]]
        ])
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        script {
 withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
          sh """
            docker build -t $REGISTRY/$BACKEND_IMAGE:$TAG ./server
            docker build -t $REGISTRY/$FRONTEND_IMAGE:$TAG ./client
            echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
            docker push $REGISTRY/$BACKEND_IMAGE:$TAG
            docker push $REGISTRY/$FRONTEND_IMAGE:$TAG
          """
        }
      }
    }
    }
    stage('Create K8s Secrets from Env Files') {
      steps {
       withCredentials([
  file(credentialsId: 'server-env-file', variable: 'SERVER_ENV'),
  file(credentialsId: 'client-env-file', variable: 'CLIENT_ENV')
]) {
  sh '''
    cp $SERVER_ENV ./server.env
    cp $CLIENT_ENV ./client.env

    kubectl delete secret backend-env || true
    kubectl create secret generic backend-env --from-env-file=./server.env

    kubectl delete secret frontend-env || true
    kubectl create secret generic frontend-env --from-env-file=./client.env
  '''
}

      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig-cred']) {
          sh '''
            kubectl apply -f k8s/postgres/
            kubectl apply -f k8s/backend/
            kubectl apply -f k8s/frontend/
          '''
        }
      }
    }

    stage('Verify Deployment') {
      steps {
        sh 'kubectl get pods -o wide'
      }
    }
  }
}
