---
# 🧭 kubectl Cheat Sheet (Printable)

---

## 🔹 Cluster & Context

```bash
kubectl cluster-info
# Show control plane & core services

kubectl config get-contexts
# List all kubeconfig contexts

kubectl config current-context
# Show active context

kubectl config use-context <context>
# Switch cluster/user

kubectl config set-context --current --namespace=<ns>
# Set default namespace for current context
```

---

## 🔹 Namespaces

```bash
kubectl get namespaces
kubectl get ns
# List all namespaces

kubectl describe namespace <ns>
# Show namespace details & quotas

kubectl create namespace <ns>
kubectl delete namespace <ns>
```

---

## 🔹 Pods (Most Used)

```bash
kubectl get pods
# List pods in current namespace

kubectl get pods -o wide
# Show pod IPs and node placement

kubectl get pods --all-namespaces
# List pods in entire cluster

kubectl describe pod <pod>
# Full pod info (events, volumes, status)

kubectl delete pod <pod>
# Delete pod (will be recreated if managed)
```

### Logs & Exec

```bash
kubectl logs <pod>
# View container logs

kubectl logs <pod> -c <container>
# Logs from specific container

kubectl logs -f <pod>
# Stream logs (tail -f)

kubectl exec -it <pod> -- sh
# Open shell inside container
```

---

## 🔹 Deployments

```bash
kubectl get deployments
# List deployments

kubectl describe deployment <deploy>
# Deployment details & rollout status

kubectl create deployment myapp --image=nginx
# Quick deployment (dev use)

kubectl scale deployment <deploy> --replicas=3
# Scale replicas
```

### Rollouts

```bash
kubectl rollout status deployment <deploy>
# Watch rollout progress

kubectl rollout history deployment <deploy>
# Show rollout versions

kubectl rollout undo deployment <deploy>
# Rollback deployment
```

---

## 🔹 Services & Networking

```bash
kubectl get services
kubectl get svc
# List services

kubectl describe svc <svc>
# Service ports, selectors & endpoints

kubectl get endpoints
# Verify pods behind service
```

### Ingress

```bash
kubectl get ingress
kubectl describe ingress <ingress>
# Domain routing → services
```

---

## 🔹 Nodes

```bash
kubectl get nodes
# List cluster nodes

kubectl get nodes -o wide
# Node IPs & versions

kubectl describe node <node>
# Node resources & conditions
```

---

## 🔹 ConfigMaps & Secrets

```bash
kubectl get configmaps
kubectl describe configmap <cm>
# App configuration data

kubectl get secrets
kubectl describe secret <secret>
# Sensitive values (base64 encoded)
```

Decode secret:

```bash
kubectl get secret <secret> \
-o jsonpath='{.data.key}' | base64 -d
```

---

## 🔹 Jobs & CronJobs

```bash
kubectl get jobs
kubectl describe job <job>

kubectl get cronjobs
kubectl describe cronjob <cronjob>
```

---

## 🔹 Resource Usage (Metrics Server required)

```bash
kubectl top nodes
# Node CPU / memory

kubectl top pods
# Pod resource usage
```

---

## 🔹 Events & Debugging (🔥 Critical)

```bash
kubectl get events
# Recent cluster events

kubectl get events --sort-by=.metadata.creationTimestamp
# Oldest → newest events

kubectl describe pod <pod>
# FIRST command when something breaks
```

---

## 🔹 YAML & File Operations

```bash
kubectl apply -f file.yaml
# Create or update resources

kubectl delete -f file.yaml
# Delete resources from file

kubectl get pod <pod> -o yaml
# Export live resource YAML
```

Dry run:

```bash
kubectl apply -f file.yaml --dry-run=client
```

---

## 🔹 Output & Filtering

```bash
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods -o json
```

---

## 🔹 High-Value One-Liners

```bash
kubectl get all
# Everything in namespace

kubectl get all -n <ns>
# Everything in specific namespace

kubectl get pods -w
# Watch pod changes live

kubectl delete pods --all -n <ns>
# Restart all pods in namespace
```

---

## 🔹 Productivity Aliases (Recommended)

```bash
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgn='kubectl get nodes'
alias kga='kubectl get all'
```

---

## 🧠 Debug Flow (Memorize This)

1. `kubectl get pods`
2. `kubectl describe pod <pod>`
3. `kubectl logs <pod>`
4. `kubectl get svc`
5. `kubectl get endpoints`
6. `kubectl get events`

---