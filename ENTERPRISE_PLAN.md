# Enterprise CI/CD Pipeline Upgrade Plan

## Goal Description
Transform the current simple CI/CD setup into a secure, scalable, enterprise-grade pipeline.
**Key Features:**
1.  **Code Quality**: Integrate linting and testing stages.
2.  **Security Scanning**: Use **Trivy** to scan files system and Docker images for vulnerabilities.
3.  **Artifact Management**: Switch from Docker Hub to a private **Nexus Repository**.
4.  **Orchestration**: Deploy to **Kubernetes (K8s)** for auto-healing and scalability.
5.  **Role of Ansible**: Clarify usage (Infrastructure vs. App Deployment).

## User Review Required
- **Nexus Credentials**: Need URL, Username, and Password for the running Nexus instance.
- **Kubeconfig**: Need access to the Kubernetes cluster (config file) on the Jenkins server.
- **Trivy Installation**: Trivy must be installed on the Jenkins agent/container.

## Proposed Changes

### 1. Code Quality & Security (The "Shield")
#### [MODIFY] [Jenkinsfile](file:///d:/portfolio/laxya-portfolio/Jenkinsfile)
- **Stage: Code Analysis**: Run `npm run lint` and `npm install`.
- **Stage: Security Scan (FS)**: Run `trivy fs .` to check source code before building.
- **Stage: Security Scan (Image)**: Run `trivy image` after building to check for container vulnerabilities.

### 2. Artifact Management (Nexus)
#### [MODIFY] [Jenkinsfile](file:///d:/portfolio/laxya-portfolio/Jenkinsfile)
- **Environment**: Update `DOCKER_REGISTRY` to point to your Nexus URL (e.g., `nexus.example.com:8082`).
- **Stage: Push**: update logic to authenticate and push to Nexus.

### 3. Kubernetes Deployment (Scalability)
#### [NEW] [k8s/deployment.yaml](file:///d:/portfolio/laxya-portfolio/k8s/deployment.yaml)
- Define a `Deployment` with 2+ replicas for high availability.
- Configure `livenessProbe` and `readinessProbe` for auto-healing.

#### [NEW] [k8s/service.yaml](file:///d:/portfolio/laxya-portfolio/k8s/service.yaml)
- Define a `Service` (LoadBalancer or NodePort) to expose the app.

#### [MODIFY] [Jenkinsfile](file:///d:/portfolio/laxya-portfolio/Jenkinsfile)
- **Stage: Deploy**: Replace SSH/Docker command with `kubectl apply -f k8s/` or Helm upgrade.

### 4. Ansible Integration
*Recommendation*: Use Ansible for **provisioning** the K8s cluster or configuring the worker nodes (installing Docker, Kubelet), NOT for deploying the app artifact (K8s does this better).
- We will add a sample playbook for server bootstrapping if requested, but keep the CI/CD focused on K8s manifests.

## Verification Plan
1.  **Build**: Verify image pushes to Nexus.
2.  **Scan**: Verify Trivy generates a security report (and optionally fails build on Critical / High severity).
3.  **Deploy**: Verify pods are running in K8s (`kubectl get pods`).
