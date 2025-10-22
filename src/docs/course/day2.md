---
title: Virtual Machine Operations
day: 2
---

# Day 2: Virtual Machine Operations

## Topics Covered
- Recognize the role of a VMware Tools Repository
- Configure a VMware Tools Repository
- Recognize the backup and restore solution for VMs
- Identify the components in the vSphere Replication architecture
- Deploy and configure vSphere Replication
- Recover replicated VMs

## I. Tổng hợp Nội dung Ngày 2: Mạng, Bảo mật & AI

### 1\. Phân tích Thiết kế Tách Lớp Mạng vSphere 8

Tài liệu tham khảo: *Phân tích thiết kế sơ đồ tách các lớp mạng dịch vụ ảo vSphere 8 (Management, vMotion, iSCSI, NFC Replicate backup, Production VMs, vSAN Network) bằng VSS, VDS, NSX.*

Đây là Best Practice (Thực hành tốt nhất) nhằm tăng cường **Bảo mật** (giảm thiểu rủi ro leo thang tấn công giữa các dịch vụ) và **Hiệu suất** (cô lập lưu lượng để tránh xung đột băng thông).

| Lớp Mạng Dịch vụ Ảo | Mục đích chính | Giao thức/Sử dụng |
| :--- | :--- | :--- |
| **Management** | Quản lý ESXi Host và vCenter. | SSH, HTTPS (vSphere Client) |
| **vMotion** | Di chuyển VM đang chạy giữa các Host. | TCP/IP |
| **vSAN** | Lưu lượng giao tiếp Cluster (Metadata, Data). | TCP/IP (yêu cầu tốc độ cao) |
| **iSCSI / NFS** | Lưu lượng kết nối Datastore từ SAN/NAS. | iSCSI, NFS |
| **NFC / Replicate Backup** | Lưu lượng Sao lưu/Khôi phục (NFC) và Replication (vSphere Replication). | TCP/IP (NFC port 902/903) |
| **Production VMs** | Lưu lượng truy cập dịch vụ của Máy ảo. | TCP/IP (đa dạng) |

### 2\. Kiến thức Nâng cao: AI/ML/Deep Learning

Tài liệu tham khảo: *Các cấp độ và phương pháp máy học (ML), dạy Deep Learn AI và phát triển AI tiến bộ nhanh.*

| Chủ đề | Thông tin Quan trọng (System Admin) |
| :--- | :--- |
| **Yêu cầu Phần cứng** | Cần **GPU Card thật** với **vRAM tối thiểu 16GB**. RAM vật lý tối thiểu gấp 2 lần vRAM. Số lượng GGPU RAM cần $1.5 \times$ số tham số của Model GGUF (ví dụ: 8B Model $\approx$ 12-16 GGPU). |
| **Phần mềm/Quy trình** | Sử dụng **Fine-Tuning** (quá trình tinh chỉnh/dạy lại Model) với các công cụ Open-source (ví dụ: H2O translation) và thuật toán **BERN** để sửa chữa Dataset. |
| **Chiến lược Model AI** | Ưu tiên chọn các **Multi-Modeling** (hợp nhất từ nhiều Model) vì chúng mạnh mẽ và linh hoạt hơn các Model đơn lẻ, đặc biệt trong môi trường **AI Private Local** (mạnh hơn AI Public). Ví dụ: `qwen3-8b-sonnet-4-gpt-5`. |

### 3\. Công cụ Hỗ trợ và Bảo mật

| Công cụ/Khái niệm | Mục đích |
| :--- | :--- |
| **tsm-itam-it-helpdesk** | Quản lý tài sản CNTT, Hỗ trợ người dùng. |
| **SIEM ELK** | Quản lý Thông tin và Sự kiện Bảo mật (Security Information and Event Management) - Thu thập Log để phân tích và chống Ransomware. |
| **SSO/MFA (Keycloak)** | Triển khai **Single Sign-On** và **Multi-Factor Authentication** (OTP qua Qrcode/Google/Microsoft Auth2.0). |
| **KMS – Key vTPM** | Quản lý Khóa Mã hóa (**Key Management Server**) và **vTPM** (Virtual Trusted Platform Module) cho **Security Boot VM** - Yếu tố then chốt để chống Ransomware/Malware. |

-----

## II. Phân tích Bài tập 2: Tách Lớp Mạng Bằng vSS (Chi phí Thấp)

**Bài tập 2:** Thiết kế tách 6 loại dịch vụ mạng (Management, vMotion, vSAN, iSCSI, NFC Backup, Production VMs) chỉ dùng **vSphere Standard Switch (vSS)** và **6 pNIC** (2 pNIC/HA/Dịch vụ). Đề xuất giải pháp **Phần cứng** và **VM Appliance** để xử lý Multi-VLAN/Multi-Gateway.

### Phân tích Nguy cơ & Hạn chế

  * **Hạn chế vSS:** Không hỗ trợ các tính năng mạng nâng cao (như PVLAN, NetIOC) và quản lý tập trung như VDS.
  * **Nguy cơ:** Việc gom chung **Management** với các dịch vụ khác trên vSS dễ dẫn đến **tấn công leo thang** và xung đột băng thông.

### Nhóm Giải pháp 1: Thiết bị Phần cứng (Router/Firewall)

Mục tiêu: Sử dụng Router/Firewall vật lý để tách $6$ VLAN/Subnet và cấu hình nhiều Gateway.

| Yêu cầu | Đề xuất Thiết bị Phần cứng | Chi tiết Cấu hình |
| :--- | :--- | :--- |
| **Multi-VLAN/PVLAN** | **Firewall hoặc Router Lớp 3 (ví dụ: Cisco ASA/FTD, Palo Alto Networks, Juniper SRX, Fortinet FortiGate, Mikrotik/EdgeRouter)**. | Chọn loại có **ít nhất 8-10 cổng vật lý** (để dự phòng và tách biệt) hoặc hỗ trợ tốc độ cao (10Gbps/25Gbps) cho các cổng uplink. |
| **Cấu hình** | Kích hoạt **802.1Q (VLAN Tagging)** trên cổng kết nối với ESXi Host. Cấu hình **$6$ Subnets/VLANs** (Management, vMotion,...) trên thiết bị. | Thiết bị đóng vai trò là **Gateway (Default Router)** cho mỗi VLAN. Cấu hình **Access Control List (ACLs) hoặc Firewall Rules** giữa các VLAN để chỉ cho phép lưu lượng cần thiết (ví dụ: chỉ cho phép Management từ dải IP quản trị). |
| **Multi-Gateway** | Mỗi VLAN có một **Sub-interface** trên Firewall/Router, mỗi Sub-interface này là **Default Gateway** cho Subnet tương ứng. |

### Nhóm Giải pháp 2: VM Appliance (Firewall Multi Routing-Gateway)

Mục tiêu: Dùng một Máy ảo (Firewall VM) chạy trên Cluster để đóng vai trò Gateway/Firewall nội bộ.

| Yêu cầu | Đề xuất VM Appliance | Chi tiết Cấu hình |
| :--- | :--- | :--- |
| **Firewall/Routing** | **pfSense, OPNsense, FortiGate VM, Cisco ASAv, Sophos UTM/XG VM.** | Đây là các Firewall phần mềm/Vendor có thể chạy dưới dạng VM. |
| **Cấu hình** | 1. Tạo một **Port Group** riêng trên **vSS** cho **Firewall VM (DMZ/Internal Routing)**. 2. Gán **$6$ Network Adapters (vNICs)** cho Firewall VM, mỗi vNIC kết nối tới một **Port Group/VLAN riêng** (Management, vMotion, iSCSI, vSAN...). 3. Cấu hình Firewall VM để thực hiện chức năng **Routing** và **Firewall Rules** giữa $6$ vNICs/mạng này. |
| **Ưu điểm** | **Chi phí thấp** (nếu dùng Open Source như pfSense/OPNsense), **Linh hoạt** trong việc cấu hình Routing/NAT/ACLs. |
| **Nhược điểm** | **Điểm đơn thất bại (SPOF):** Nếu Firewall VM lỗi, toàn bộ routing giữa các dịch vụ bị gián đoạn. **Giải pháp:** Cần triển khai 2 Firewall VM với cấu hình **HA (High Availability)** như CARP/VRRP. |

### Sơ đồ Cấu hình vSS với 6 pNIC (2 pNIC/Dịch vụ)

Với $6$ dịch vụ và $6$ pNIC, bạn phải gán mỗi loại dịch vụ cho một cặp pNIC riêng biệt để đạt được tính dự phòng (Redundancy) và cách ly vật lý.

| Dịch vụ (6 loại) | pNIC Gán (2 pNIC/Dịch vụ) | Port Group (vSS) | Vlan ID (Ví dụ) |
| :--- | :--- | :--- | :--- |
| **Management** | pNIC1, pNIC2 | PG-Management | VLAN 10 |
| **vMotion** | pNIC3, pNIC4 | PG-vMotion | VLAN 20 |
| **vSAN / iSCSI** | pNIC5, pNIC6 | PG-Storage | VLAN 30 |
| **NFC Backup / Replicate** | pNIC7, pNIC8 | PG-Backup | VLAN 40 |
| **Production VMs 1** | pNIC9, pNIC10 | PG-Prod-A | VLAN 50 |
| **Production VMs 2** | pNIC11, pNIC12 | PG-Prod-B | VLAN 60 |

***LƯU Ý:*** Bạn chỉ có **6 pNIC** vật lý, nên bạn **không thể** có 6 cặp pNIC (12 pNIC) dự phòng hoàn toàn. Bạn phải chia sẻ pNIC, dẫn đến nguy cơ xung đột băng thông cao hơn.

**Cấu hình thực tế với 6 pNIC:**

| Dịch vụ (6 loại) | pNIC Gán (Chia sẻ Tải/Dự phòng) | Policy (Teaming) |
| :--- | :--- | :--- |
| **Management** | pNIC1, pNIC2 | Active/Standby hoặc Active/Active |
| **vMotion** | pNIC3, pNIC4 | Active/Active (Route based on IP Hash) |
| **Storage (iSCSI/vSAN)** | pNIC5, pNIC6 | Active/Active (iSCSI: Port Binding; vSAN: Active/Active) |
| **NFC Backup/Replicate** | **PG-Backup:** Dùng lại pNIC3, pNIC4 | Tách biệt **Active Adapter** so với vMotion (Override Failover Order). |
| **Production VMs** | **PG-Prod:** Dùng lại pNIC1, pNIC2, pNIC5, pNIC6 | Tăng cường băng thông, nhưng nguy cơ cao cho Management. |

**Yêu cầu Vẽ Sơ đồ (Mermaid Code):**

```mermaid
graph TD
    subgraph Cluster VMWare (vSS)
        A[ESXi Host]
        subgraph Virtual Switch (vSS)
            direction LR
            B(PG-Management - VLAN 10)
            C(PG-vMotion - VLAN 20)
            D(PG-Storage - VLAN 30/40)
            E(PG-Backup - VLAN 50)
            F(PG-Production - VLAN 60)
            
            p12[pNIC1/pNIC2]
            p34[pNIC3/pNIC4]
            p56[pNIC5/pNIC6]
            
            B --- p12
            C --- p34
            D --- p56
            E --- p34
            F --- p12 & p56
        end
        A -->|6 pNIC| p12
        A -->|6 pNIC| p34
        A -->|6 pNIC| p56
    end
    
    subgraph Physical Network & Gateway
        Router_FW(Router/Firewall - L3)
        p12 --- Router_FW
        p34 --- Router_FW
        p56 --- Router_FW
    end
    
    Router_FW -->|Routing| Management_Client
    Router_FW -->|Policy| SAN_Storage
    Router_FW -->|Internet| Outside_World
    
    D -.- SAN_Storage
    
    style Router_FW fill:#f9f,stroke:#333,stroke-width:2px
    style A fill:#ccf,stroke:#333
```

-----

## III. Phân tích Bài tập 4 & 5 (Slide Hướng dẫn Bảo mật)

Bài tập 4 và 5 yêu cầu tạo **Slide hướng dẫn chi tiết, từng bước kèm ảnh minh họa** cho việc cấu hình **LDAPS** và **SSO/MFA** cho vCenter. Đây là các quy trình kỹ thuật chuyên sâu, và tôi sẽ phân tích các bước cốt lõi cần có trong mỗi slide.

### Bài tập 4: Cấu hình LDAPS + KEYCLOAK (SSO & MFA)

**Mục đích:** Sử dụng **Keycloak** làm Nhà cung cấp Định danh (**IdP**) cho vCenter, hỗ trợ **MFA** (OTP/Auth2.0) để tăng cường bảo mật so với Active Directory truyền thống.

| Bước trong Slide (Cần Ảnh minh họa) | Chi tiết Cấu hình |
| :--- | :--- |
| **1. Cài đặt Keycloak & Realm** | Cài đặt Keycloak (trên Ubuntu 24.04). Tạo **Realm** và **Client** cho vCenter. |
| **2. Cấu hình Liên kết AD (LDAPS)** | Trong Keycloak, cấu hình **User Federation** (LDAP) để kết nối với Active Directory (AD) qua **LDAPS (Port 636)**. Import User/Group từ AD. |
| **3. Cấu hình MFA trong Keycloak** | Kích hoạt **MFA (OTP/TOTP)** cho Realm. Hướng dẫn người dùng quét **QR Code** để liên kết với Microsoft/Google Authenticator. |
| **4. Tạo OIDC/OAuth2 Client cho vCenter** | Trong Keycloak, tạo một **OpenID Connect (OIDC) Client** với các thông tin cần thiết (Client ID, Secret, Redirect URIs). |
| **5. Thêm Keycloak IdP vào vCenter** | Trong vCenter (vSphere Client): Đi tới **Administration \> Single Sign-On \> Configuration \> Identity Providers**. Thêm **Federated Identity Provider** (OAuth2/OIDC). |
| **6. Gán Quyền (Role) và Thử nghiệm** | Trong vCenter, gán quyền (Roles) cho các Group từ AD (đã đồng bộ qua Keycloak). **Thử nghiệm đăng nhập** vCenter, kiểm tra chuyển hướng sang Keycloak và yêu cầu **MFA-OTP**. |

### Bài tập 5: Cấu hình LDAPS + ADFS 2019 DC (SSO)

**Mục đích:** Sử dụng **Active Directory Federation Services (ADFS)** của Microsoft để làm IdP, đây là giải pháp SSO phổ biến trong môi trường Doanh nghiệp lớn.

| Bước trong Slide (Cần Ảnh minh họa) | Chi tiết Cấu hình |
| :--- | :--- |
| **1. Cấu hình LDAPS trên AD** | Cài đặt **Certificate Authority (CA)** trên Domain Controller (DC) và cấp chứng chỉ cho **LDAPS (Port 636)**. |
| **2. Cài đặt và Cấu hình ADFS** | Cài đặt vai trò **ADFS 2019** trên DC riêng. Cấu hình ADFS Server. |
| **3. Tạo Relying Party Trust (RPT) cho vCenter** | Trong ADFS Management, tạo **Relying Party Trust (RPT)** mới cho vCenter (sử dụng Metadata URL của vCenter/vSphere). |
| **4. Cấu hình Claim Rules** | Tạo các **Claim Rules** (ví dụ: gửi User Principal Name, Group Membership) để ADFS gửi thông tin xác thực cần thiết về vCenter. |
| **5. Thêm ADFS IdP vào vCenter** | Trong vCenter (vSphere Client): Đi tới **Administration \> Single Sign-On \> Configuration \> Identity Providers**. Thêm **Federated Identity Provider** (SAML). Nhập Metadata của ADFS. |
| **6. Gán Quyền (Role) và Thử nghiệm** | Gán quyền (Roles) cho các Group từ AD. **Thử nghiệm đăng nhập** vCenter, kiểm tra chuyển hướng sang trang ADFS và SSO thành công. |