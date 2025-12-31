+-------------------+
|   Start Pipeline  |
+-------------------+
          |
          v
+---------------------------+
| Security Scan (Source)    |
| - Trivy FS scan           |
+---------------------------+
          |
          v
+---------------------------+
| Build Docker Image        |
| - docker build            |
| - tag: v1.0.BUILD_NUMBER- |
|   <commit hash>           |
+---------------------------+
          |
          v
+---------------------------+
| Security Scan (Image)     |
| - Trivy Image scan        |
+---------------------------+
          |
          v
+---------------------------+
| Push Docker Image to Nexus|
| - docker login            |
| - docker push <tag>       |
| - docker push latest      |
+---------------------------+
          |
          v
+---------------------------+
| Deploy to Kubernetes      |
| - scp manifests           |
| - kubectl apply           |
| - rollout restart         |
| - verify pods             |
+---------------------------+
          |
          v
+---------------------------+
| Post Actions              |
| - docker logout           |
| - remove local images     |
+---------------------------+
          |
          v
+-------------------+
| Pipeline Complete |
+-------------------+
