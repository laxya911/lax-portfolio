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

## Critical Infrastructure Checklist (Completed Phase 1 & 2)
### Nexus Registry Setup
1.  **Security Group**: Open Custom TCP Port **8082** on the Nexus/Jenkins Server (Source: VPC CIDR or All).
2.  **Nexus Container**: Must expose the connector port: `-p 8082:8082`.
3.  **Private IP**: Use the **Private IP** (`172.31.78.13`) in Jenkinsfile to avoid AWS Hairpin NAT timeouts.

### Docker Daemon Configuration (`/etc/docker/daemon.json`)
Since Nexus is running on HTTP (not HTTPS), all servers interacting with it must whitelist it.
**On Jenkins Server & Dev Server:**
```json
{
  "insecure-registries" : ["172.31.78.13:8082"]
}
```
*Restart Docker (`sudo systemctl restart docker`) after editing.*

### Kubernetes App Access
1.  **Security Group**: Open Custom TCP Port **30080** on the Dev Server (`98.92.203.102`).
    *   This allows you to access the app via `http://98.92.203.102:30080`.

### K8s Troubleshooting: Disk Full (Pending Pods)
If your pods are stuck in **Pending** due to `DiskPressure`:
1.  **AWS Console**: Select the Volume -> Actions -> Modify Volume -> Increase to 20GB.
2.  **SSH into Server** and expand the partition:
    ```bash
    # 1. Expand the partition (Note the space between xvda and 1)
    sudo growpart /dev/xvda 1
    
    # 2. Resize the filesystem (Ubuntu uses ext4 usually)
    sudo resize2fs /dev/xvda1
    
    # 3. Verify
    df -h
    ```

## Phase 3: Kubernetes Setup (Required)
Since you don't have a cluster yet, we will install **K3s** (Lightweight Kubernetes) on your Dev Server (`98.92.203.102`).

### 1. Install K3s (On Dev Server)
SSH into your Dev Server and run:
```bash
curl -sfL https://get.k3s.io | sh -
# Verify installation
sudo k3s kubectl get nodes
```

### 2. Configure K3s for Nexus (Insecure Registry)
K3s does **NOT** use `daemon.json`. You must create a separate config to allow HTTP images.
Create/Edit `/etc/rancher/k3s/registries.yaml`:
```yaml
mirrors:
  "172.31.78.13:8082":
    endpoint:
      - "http://172.31.78.13:8082"
```
*Restart K3s:* `sudo systemctl restart k3s`

### 3. Allow Jenkins to access Kubeconfig
To allow the `ubuntu` user (which Jenkins SSH uses) to run `kubectl`:
```bash
sudo chmod 644 /etc/rancher/k3s/k3s.yaml
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
# Add to .bashrc to make it permanent for 'ubuntu' user:
echo "export KUBECONFIG=/etc/rancher/k3s/k3s.yaml" >> ~/.bashrc
```

### 4. Create Pull Secret
K8s needs credentials to login to Nexus. Run this on the Dev Server:
```bash
sudo k3s kubectl create secret docker-registry nexus-credentials \
  --docker-server=172.31.78.13:8082 \
  --docker-username=admin \
  --docker-password=<YOUR_NEXUS_PASSWORD>
```

## Verification Plan
1.  **Build**: Verify image pushes to Nexus. (DONE)
2.  **Scan**: Verify Trivy generates a security report. (DONE)
3.  **Deploy**: Verify pods are running in K8s (`kubectl get pods`).
