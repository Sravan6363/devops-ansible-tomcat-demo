pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating deployment files...'

                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js
                    echo "Application files validated successfully."
                '''
            }
        }

        stage('Deploy with Ansible') {
            steps {
                echo 'Starting Ansible deployment...'

                sh '''
                    ansible-playbook \
                    -i /root/ansible-tomcat/inventory \
                    /root/ansible-tomcat/deploy.yml
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
