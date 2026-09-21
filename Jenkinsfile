pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Generate Deployment Metadata') {
            steps {
                echo 'Generating deployment metadata...'

                sh '''
                    cat > deployment-info.json <<EOF
{
  "buildNumber": "${BUILD_NUMBER}",
  "jobName": "${JOB_NAME}",
  "gitCommit": "${GIT_COMMIT}",
  "gitBranch": "${GIT_BRANCH}",
  "environment": "DEV",
  "status": "SUCCESS"
}
EOF

                    cat deployment-info.json
                '''
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating application files...'

                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js
                    test -f deployment-info.json
                    echo "Application files validated successfully."
                '''
            }
        }

        stage('Deploy with Ansible') {
            steps {
                echo 'Starting Ansible deployment...'

                sh '''
                    sudo /usr/bin/ansible-playbook \
                    -i /opt/ansible-tomcat/inventory \
                    /opt/ansible-tomcat/deploy.yml \
                    -e "app_source=$WORKSPACE"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying Tomcat deployment...'

                sh '''
                    curl -f http://localhost:8081/ > /dev/null
                    echo "Tomcat application is responding successfully."
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Deployment failed. Check the Jenkins console output.'
        }
    }
}
