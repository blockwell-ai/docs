node {
    stage('Clone sources') {
        checkout scm
    }

    stage('Dependencies') {
        sh 'npm ci --production'
    }

    stage('Build') {
        sh 'make build'
    }

    stage ('Artifacts') {
        archiveArtifacts 'build/**/*'
    }

    stage ('Deploy') {
        sshagent(['jenkins_blockwell_web']) {
            if (BRANCH_NAME == "master") {
                sh 'make deploy-prod'
            }
        }
    }
}
