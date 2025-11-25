# Aera Security & Privacy Documentation

## 1. Commitment to Security & Privacy and Scope

Aera is committed to providing a comprehensive security and privacy program that carefully considers data protection matters across our suite of products and services, including data submitted by customers to our Service (“Customer Data”).  
Aera utilizes infrastructure-as-a-service cloud providers as further described in the Agreement and/or Documentation (each, a “Cloud Provider”) and provides the Service to Customer using a VPC/VNET and storage hosted by the applicable Cloud Provider (the “Cloud Environment”).

## 2. Scope

This documentation describes the security-related audits and certifications received for, and the administrative, technical, and physical controls applicable to, the Aera cloud-based services (“Service(s)”).  
This documentation does not apply to free evaluation services or Aera Developer made available by Aera.

## 3. Permitted Purposes

### 3.1 Privacy
Aera has implemented procedures designed to ensure that Customer Data is processed only as instructed by the Customer. Subcontractors may use only the Customer Data necessary to perform the Service under the Agreement.

### 3.2 Sale or Other Transfer Prohibited
Aera will not transfer, sell, or otherwise distribute or make any Customer Data available to any third party except as otherwise specifically provided under the Agreement.

## 4. Information Security Requirements

### 4.1 General Security Requirement
Aera will maintain physical, administrative, and technical safeguards appropriate to:
- The size, scope, and type of Aera’s business;
- The amount of resources available to Aera;
- The type of information that Aera will store and process; and
- The need for security and protection from unauthorized disclosure.

Aera’s practices are consistent with industry-accepted best practices (including ISO 27001 and NIST Cybersecurity Framework) to protect the confidentiality, integrity, and availability of Customer Data.

### 4.2 Specific Safeguard Requirements

#### 4.2.1 Written Information Security Program
Aera will implement a written information security program, including policies, procedures, and risk assessments reviewed at least annually.

#### 4.2.2 Security Awareness Training, Background Checks, and Disciplinary Policy
- Periodic training on threats such as social-engineering, sensitive data handling, and incident reporting.  
- Background checks for employees with access to Customer Data.  
- Written acknowledgment of compliance with information security policies.  
- Disciplinary process for violations.

#### 4.2.3 Data Inventory
Aera documents and maintains information on how and where Customer Data is processed.

#### 4.2.4 Secure Configurations
Aera manages system configurations using industry standards to protect Customer Data from vulnerabilities.

#### 4.2.5 Controlled Use of Administrative Privileges
Aera limits and controls administrative privileges in line with best practices.

#### 4.2.6 Vulnerability and Patch Management
- Critical/high vulnerabilities addressed within 30 days.  
- Medium vulnerabilities within 90 days.  
- Uses NVD CVSS and U.S.-CERT ratings.

#### 4.2.7 Monitoring
Monitoring tools such as host-based intrusion detection are used to log activities and changes.

#### 4.2.8 Malware Defenses
Industry-standard measures detect and remediate malware. Aera does not monitor Customer Data for malicious code.

#### 4.2.9 Firewalls
Cloud Environment protected by deny-all default policies; only business-required traffic allowed.

#### 4.2.10 Change Management
Aera maintains a documented change management program.

#### 4.2.11 Hardening
Environment hardened using best practices (password changes, removal of unnecessary software/services, regular patching).

#### 4.2.12 Encryption
All Customer Data encrypted at rest and in transit. Encryption key copies securely deleted upon request.

#### 4.2.13 Access Controls
- **Unique IDs** – All personnel use individual credentials.  
- **Need-to-know** – Access limited to necessary personnel.  
- **Access Reviews** – Conducted every 180 days.

#### 4.2.14 Disaster Recovery
Includes:
- **Data Backups**  
- **Disaster Recovery Plan** tested regularly  
- **Business Continuity Plan**

#### 4.2.15 Account and Password Management
- No default passwords.  
- Admin accounts inventoried.  
- Strong password requirements:
  - Min 8 characters  
  - Not common or compromised  
  - Forced change if compromised  
- Credentials encrypted and rate limiting enforced.

#### 4.2.16 Remote Access & MFA
Multi-factor authentication (MFA) required for remote access.

#### 4.2.17 Data Segregation
Customer Data logically isolated from Aera and third-party data.

#### 4.2.18 Security Testing
Periodic internal and external penetration testing performed; vulnerabilities addressed via Aera’s management program.

## 5. Data Retention, Return, and Destruction

### 5.1 Retention
Customer Data retained only as necessary.

### 5.2 Return and Secure Deletion
Upon request or termination, Aera securely deletes all Customer Data and confirms in writing.

### 5.3 Archival Copies
If retained:
- Not used for any other purpose.  
- Remain protected and subject to incident notification obligations.

### 5.4 Deletion Standard
Secure deletion methods include overwriting, degaussing, shredding, or disintegration. Encrypted data may be deleted by destroying encryption keys.

## 6. Security Reviews and Audits
Customers may request Aera’s current audit report and findings.

## 7. Security Incidents

### 7.1 Definition
A “Security Incident” is any verified unauthorized access to or use of Customer Data.

### 7.2 Incident Response
Aera maintains a written plan and remedies incidents promptly.

### 7.3 Notification
Customer notified within **72 hours** of becoming aware.

### 7.4 Cooperation
Aera provides updates and investigative actions; communications do not imply liability.

### 7.5 Third-Party Notifications
No third-party notifications without Customer’s written consent unless legally required.

## 8. Notice of Legal Process
Aera will, where legally permitted, inform Customer when data is sought under legal process (e.g., 18 U.S.C. § 2705(b)).

## 9. Communication with Users
Aera may provide users with access to online communities, support, announcements, and relevant product information.

## 10. Shared Security Responsibilities

### 10.1 Customer Data Content
Customer is responsible for ensuring appropriate data security, including encryption and configuration.

### 10.2 User Credentials
Customer manages roles, credentials, and access scope, reports suspicious activity, and maintains password security.

### 10.3 Encryption Keys
Customer manages encryption keys to ensure integrity, confidentiality, and availability.

### 10.4 Updates
Customer promptly updates on-premise components when Aera releases updates.
