pipeline {
    agent any

    environment {
        // --- CONFIGURATION ---
        DOCKER_REGISTRY = 'docker.io' // Or your private registry URL
        DOCKER_REPO     = 'laxya911/laxya-portfolio' // Change to your username/repo
        IMAGE_NAME      = "${DOCKER_REGISTRY}/${DOCKER_REPO}"
        APP_NAME = "laxya-portfolio"
        // Versioning: v1.0.<BuildNumber>
        IMAGE_TAG       = "v1.0.${BUILD_NUMBER}" 
        
        // Credentials IDs (Must likely be created in Jenkins)
        DOCKER_CREDS_ID = 'docker-id'
        SSH_CREDS_ID    = 'ec2-ssh-key'
        
        // Deployment Server Details
        DEV_SERVER_IP = "3.238.188.223"
        DEV_SERVER_USER = "ubuntu"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo "Building Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                    // Build with the unique version tag
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    echo "Pushing Docker Image to Registry..."
                    // Login to Docker Hub/Registry
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDS_ID, passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo $DOCKER_PASS | docker login ${DOCKER_REGISTRY} -u $DOCKER_USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                        // Also push 'latest' tag for convenience (optional)
                        sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying to Development Server..."
                    sshagent(credentials: [SSH_CREDS_ID]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DEV_SERVER_USER}@${DEV_SERVER_IP} '
                                # Pull the specific version
                                docker pull ${IMAGE_NAME}:${IMAGE_TAG}
                                
                                # Stop and remove existing container (if any)
                                docker stop laxya-portfolio || true
                                docker rm laxya-portfolio || true
                                
                                # Run the new container
                                # Run the new container
                                if ! docker run -d \
                                    --name laxya-portfolio \
                                    -p 80:3000 \
                                    --restart unless-stopped \
                                    ${IMAGE_NAME}:${IMAGE_TAG}; then
                                   echo "Deployment Failed! Deleting image to save space..."
                                   docker rmi ${IMAGE_NAME}:${IMAGE_TAG}
                                   exit 1
                                fi
                            '
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Logout from Docker to clean up
            // Logout and clean up images to save disk space
            sh "docker logout ${DOCKER_REGISTRY}"
            sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
            sh "docker rmi ${IMAGE_NAME}:latest || true"
            echo 'Pipeline completed.'
        }
        success {
            echo "Successfully deployed version ${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}