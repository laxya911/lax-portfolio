# Enterprise Pipeline Tasks

- [ ] **Phase 1: Security & Quality** <!-- id: 14 -->
    - [ ] Add `npm run lint` stage <!-- id: 15 -->
    - [ ] Integrate **Trivy** for file system scan (Pre-build) <!-- id: 16 -->
    - [ ] Integrate **Trivy** for image scan (Post-build) <!-- id: 17 -->

- [ ] **Phase 2: Artifacts (Nexus)** <!-- id: 18 -->
    - [ ] Configure Nexus credentials in Jenkins <!-- id: 19 -->
    - [ ] Update `Jenkinsfile` to push to Nexus <!-- id: 20 -->

- [ ] **Phase 3: Orchestration (Kubernetes)** <!-- id: 21 -->
    - [ ] Create `k8s/deployment.yaml` (Replicas, Probes) <!-- id: 22 -->
    - [ ] Create `k8s/service.yaml` <!-- id: 23 -->
    - [ ] Update `Jenkinsfile` to deploy using `kubectl` <!-- id: 24 -->

- [ ] **Phase 4: Final Verification** <!-- id: 25 -->
    - [ ] Verify full end-to-end pipeline <!-- id: 26 -->
