# Enterprise Automation Roadmap
> **Objective**: A step-by-step guide to building a scalable, secure, and automated infrastructure for `laxya-portfolio`. This document serves as a roadmap for stakeholders (CTO, Managers) to understand the "What" and "Why" of each phase.

---

## Phase 1: Architecture & Capacity Planning
**Goal**: Define the infrastructure blueprint before writing code. Determine server roles, resource requirements, and network topology.
**Why**: Prevents over-provisioning (cost waste) or under-provisioning (performance bottlenecks). Ensures High Availability (HA) and Fault Tolerance.

### 1.1 Server Roles & Resource Sizing
*   **Bastion Host (Jump Box)**:
    *   **Purpose**: Single entry point for SSH access to private servers.
    *   **Spec**: `t3.nano` (1 vCPU, 0.5GB RAM) - Minimal resources needed.
*   **Jenkins Controller**:
    *   **Purpose**: Orchestrates CI/CD pipelines.
    *   **Spec**: `t3.medium` (2 vCPU, 4GB RAM) - Java-based, needs RAM.
*   **Dev Server (K3s Master)**:
    *   **Purpose**: Development & staging environment.
    *   **Spec**: `t3.medium` or `t3.large` (2 vCPU, 4-8GB RAM, 20GB Disk).
*   **App Worker Nodes (Prod)**:
    *   **Purpose**: Run actual application pods.
    *   **Spec**: `t3.medium` x 3 (Distributed across Availability Zones A, B, C).
*   **Database Server**:
    *   **Purpose**: Persistent data storage (PostgreSQL/MongoDB).
    *   **Spec**: `db.t3.medium` (RDS) or `r5.large` (EC2) - Memory optimized.
*   **Monitoring Server**:
    *   **Purpose**: Hosting Prometheus/Grafana.
    *   **Spec**: `t3.small` (2 vCPU, 2GB RAM).

### 1.2 Network Topology
-   **VPC**: `10.0.0.0/16`
-   **Public Subnets**: For Load Balancers & Bastion.
-   **Private Subnets**: For App Servers, DB, and K8s Nodes (No direct internet access).

---

## Phase 2: Infrastructure Provisioning (Terraform)
**Goal**: Use "Infrastructure as Code" (IaC) to create servers, networks, and firewalls automatically.
**Why**: Reproducibility. If a disaster wipes out the region, we can rebuild the entire datacenter in minutes with one command (`terraform apply`).

- [ ] **Setup State Management**: Configure S3 Backend + DynamoDB Locking (Prevents conflicts).
- [ ] **Network Module**: Create VPC, Subnets, Internet Gateway, NAT Gateway.
- [ ] **Security Groups**:
    -   `sg_bastion`: Allow SSH (22) from Admin IP only.
    -   `sg_app`: Allow HTTP (80/443) from Load Balancer only.
    -   `sg_db`: Allow Port 5432 from `sg_app` only.
- [ ] **Compute Module**: Provision EC2 instances using the specs defined in Phase 1.
- [ ] **Database Module**: Provision RDS instances with auto-backups enabled.

---

## Phase 3: Configuration Management (Ansible)
**Goal**: Configure the "bare metal" servers created by Terraform. Install software and harden security.
**Why**: Consistency. Ensures every server has the exact same security patches, log configurations, and tools. Eliminates "works on my machine" issues.

- [ ] **Inventory Grouping**: Group servers in `hosts.ini` (`[web]`, `[db]`, `[ci]`).
- [ ] **Common Role** (All Servers):
    -   Update OS packages (`apt update`).
    -   Create standard users (`devops`).
    -   Install basics: `curl`, `git`, `htop`, `vim`.
    -   Security Hardening: Disable Root SSH, Install Fail2ban.
- [ ] **Docker Role**: Install Docker, Containerd, Docker Compose.
- [ ] **K8s Role**: Install K3s (or Kubelet/Kubeadm) and join nodes to cluster.
- [ ] **Monitoring Role**: Install Node Exporter (to send metrics to Prometheus).

---

## Phase 4: CI/CD Pipeline Setup (Jenkins + Nexus)
**Goal**: Automate code testing, building, and delivery.
**Why**: Velocity. Developers can release features multiple times a day without manual FTP/SSH steps.

- [x] **Artifact Repository**: Setup Nexus for private Docker image storage.
- [x] **Pipeline Code (`Jenkinsfile`)**:
    -   **Lint & Test**: Fail fast on bad code.
    -   **Security Scan (Trivy)**: Block vulnerabilities before they reach Prod.
    -   **Build & Push**: Semantic versioning of Docker images.
    -   **Deploy**: Trigger deployment to K8s.

---

## Phase 5: Orchestration (Kubernetes)
**Goal**: Manage application containers at scale.
**Why**: Reliability. Auto-healing (restarts crashed apps), Auto-scaling (adds nodes during traffic spikes), and Zero-Downtime deployments.

- [x] **Manifests**:
    -   `deployment.yaml`: Define Replicas (High Availability).
    -   `service.yaml`: Expose app via NodePort/LoadBalancer.
    -   `ingress.yaml`: Configure routing (e.g., `app.example.com`).
- [ ] **Secrets Management**: Store API keys/DB passwords in K8s Secrets (or Vault).
- [ ] **Namespaces**: Isolate environments (`dev`, `staging`, `prod`) within the cluster.

---

## Phase 6: Observability & Monitoring (Day 2 Operations)
**Goal**: Know when something breaks *before* the customer calls.
**Why**: Business Continuity.

- [ ] **Prometheus**: Scrape metrics (CPU, RAM, Request Latency) from all nodes.
- [ ] **Grafana**: Visualize metrics in dashboards (e.g., "Website Traffic", "Error Rate").
- [ ] **AlertManager**: Send Slack/Email alerts if `Error Rate > 1%` or `Disk > 90%`.
- [ ] **ELK/Loki Stack**: Centralized logging. Search logs across 50 servers in one place.
