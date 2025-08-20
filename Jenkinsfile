pipeline {
  agent {
    label 'themes'
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

    stage('Prepare Environment') {
      steps {
        withCredentials([
          file(credentialsId: 'server-env-file', variable: 'SERVER_ENV'),
          file(credentialsId: 'client-env-file', variable: 'CLIENT_ENV')
        ]) {
          sh '''
            cp $SERVER_ENV ./server/.env
            cp $CLIENT_ENV ./client/.env
          '''
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Start App') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}
