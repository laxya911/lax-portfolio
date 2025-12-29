pipeline {
    agent any

    environment {
        // --- CONFIGURATION ---
        // CRITICAL: Use Private IP (x.x.x.x) to avoid AWS Loopback/Hairpin NAT issues.
        // If you use Public IP, the connection might time out from inside the EC2 instance.
        DOCKER_REGISTRY = '172.31.78.13:8082' 
        DOCKER_REPO     = 'laxya-portfolio' // Image Name in Nexus
        IMAGE_NAME      = "${DOCKER_REGISTRY}/${DOCKER_REPO}"
        APP_NAME = "laxya-portfolio"
        // Versioning: v1.0.<BuildNumber>
        IMAGE_TAG       = "v1.0.${BUILD_NUMBER}" 
        
        // Credentials IDs
        DOCKER_CREDS_ID = 'nexus-credentials' // ID for Nexus Username/Password in Jenkins
        SSH_CREDS_ID    = 'ec2-ssh-key' // ID for SSH Key to access Dev Server
        
        // Deployment Server Details
        DEV_SERVER_IP = "98.92.203.102"
        DEV_SERVER_USER = "ubuntu"
    }

    stages {
        stage('Security Scan (FS)') {
            steps {
                script {
                    echo "Scanning Source Code..."
                    echo "Scanning Source Code..."
                    // CRITICAL: We download the Trivy binary directly.
                    // Running 'docker run -v $PWD:...' fails because we are inside a container (Jenkins).
                    // This 'Sibling Container' issue prevents mounting the workspace volume correctly.
                    sh "curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b ."
                    
                    // Run Trivy FS scan usage local binary
                    sh "./trivy fs . --severity HIGH,CRITICAL"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                    // Build with the unique version tag
                    // Note: 'next build' inside Dockerfile performs linting by default
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Security Scan (Image)') {
            steps {
                script {
                    echo "Scanning Docker Image..."
                    // Use the locally installed trivy binary
                    sh "./trivy image ${IMAGE_NAME}:${IMAGE_TAG} --severity HIGH,CRITICAL"
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    echo "Pushing Docker Image to Registry..."
                    // Login to Docker Hub/Registry
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDS_ID, passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        // CRITICAL: Use SINGLE QUOTES ('') to prevent Groovy from interpreting $DOCKER_PASS.
                        // This allows the shell to handle the secret safely without leaking it in logs.
                        sh 'echo $DOCKER_PASS | docker login ${DOCKER_REGISTRY} -u $DOCKER_USER --password-stdin'
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
                    echo "Deploying to Development Server (Kubernetes)..."
                    sshagent(credentials: [SSH_CREDS_ID]) {
                        // 1. Transfer K8s manifests to the server
                        // We use 'scp' (Secure Copy) to put the files on the server
                        sh "scp -o StrictHostKeyChecking=no -r k8s/ ${DEV_SERVER_USER}@${DEV_SERVER_IP}:/home/${DEV_SERVER_USER}/"
                        
                        // 2. Apply the manifests using kubectl
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DEV_SERVER_USER}@${DEV_SERVER_IP} '
                                # Ensure KUBECONFIG is set (if not already in .bashrc)
                                export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
                                
                                # Apply the manifests
                                # This will create/update the Deployment and Service
                                kubectl apply -f /home/${DEV_SERVER_USER}/k8s/
                                
                                # Force a rollout restart to pick up the new image version
                                # (Since the tag might be 'latest' or specific, this ensures rotation)
                                kubectl rollout restart deployment/laxya-portfolio
                                
                                # Verify status
                                kubectl get pods
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