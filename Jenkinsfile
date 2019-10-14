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
        archiveArtifacts 'docs/.vuepress/dist/**/*'
    }

    stage ('Deploy') {
        sshagent(['jenkins_blockwell_web']) {
            sh 'make deploy-prod'
        }
    }
}
