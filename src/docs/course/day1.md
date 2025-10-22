---
title: Course Introduction
day: 1
---

## I. Nội dung Khóa học VMware vSphere 8 (Quản trị & Vận hành)

Đây là các mô-đun chính trong khóa học của bạn, tập trung vào kiến thức và kỹ năng vận hành nâng cao trong vSphere 8:

### 1. Vận hành Máy ảo (Virtual Machine Operations)
* Quản lý **VMware Tools Repository**.
* Các giải pháp **Sao lưu và Khôi phục** VM.
* Triển khai và cấu hình **vSphere Replication** (DR/HA).

### 2. Vận hành Cluster (vSphere Cluster Operations)
* Quản lý tài nguyên: Tạo và quản lý **Resource Pools**.
* Hiểu về cơ chế **Scalable Shares**.
* Chức năng và vận hành của **vSphere Cluster Services (vCLS)**.

### 3. Vận hành Mạng (Network Operations)
* Cấu hình và quản lý **vSphere Distributed Switches (VDS)**.
* Tối ưu hiệu suất với **vSphere Network I/O Control (NetIOC)**.
* Các tính năng VDS nâng cao: Port Mirroring, NetFlow.
* Khái niệm và lợi ích của **vSphere Distributed Services Engine** (DPU/SmartNICs).

### 4. Vận hành Lưu trữ (Storage Operations)
* Hỗ trợ công nghệ lưu trữ mới: **NVMe** và **iSER**.
* Kiến trúc và yêu cầu của **vSAN** (Virtual SAN).
* Quản lý lưu trữ dựa trên chính sách: **Storage Policy-Based Management (SPBM)**.
* Kiến trúc **vSphere Virtual Volumes (vVols)**.
* Cấu hình **Storage I/O Control (SIOC)**.

### 5. Vận hành vCenter và ESXi (vCenter and ESXi Operations)
* Lên lịch **Sao lưu vCenter** và vai trò của **vCenter High Availability (vCHA)**.
* Quản lý tuân thủ cấu hình ESXi bằng **Host Profiles**.
* Quản lý **Chứng chỉ vSphere** qua vSphere Client.

### 6. Giám sát và Hiệu suất (vSphere Monitoring)
* Giám sát hiệu suất **VM và vCenter**.
* Sử dụng công cụ vCenter để theo dõi tài nguyên.
* Tạo **Custom Alarms**.
* Giới thiệu và lợi ích của **VMware Skyline** (Skyline Advisor Pro).

### 7. Bảo mật và Truy cập (vSphere Security and Access Control)
* Chiến lược bảo mật cho các thành phần **vCenter, ESXi Host và VM**.
* Triển khai **Identity Federation** (sử dụng nhà cung cấp định danh ngoài).
* Tính năng bảo mật: **VM Encryption, vSphere Trust Authority**.
* Quản lý và di chuyển **VM đã mã hóa**.

***

## II. Ghi chú Kỹ thuật và Sizing (Phân tích và Công cụ)

Phần này tổng hợp các ghi chú của bạn về tính toán chi phí, phân loại tài nguyên và công cụ giám sát:

### 1. Sizing và Chi phí
* **Total Cost of Ownership (TCO):** $TCO = CAPEX + OPEX$.
* **Phân loại VM:** Dựa trên KPI về tài nguyên (**CPU, RAM, GPU, Storage**).
* **Bài tập:** Sử dụng file Excel để tính toán sizing.

### 2. Lưu trữ (Storage)
* **Các Giao thức/Công nghệ:** FC, FCoE, iSCSI, **NFS 4.1** (lưu ý tính năng **quota** để chống Ransomware), SMB 3.3.
* **Sao lưu đối tượng (Object Backup):** S3c (ví dụ: Minio).
* **Các loại Storage:** **vSAN** (DAS - Direct-Attached Storage), **vVOL** (phân tán/descentralization Storage, ví dụ: NetApp, HPE).
* **Quy tắc Datastore:** Tối ưu là **80% dung lượng sử dụng, 20% trống**.
* **Tác vụ ảnh hưởng:** Snapshot vSphere, Backup (qua NFC - TCP/IP port 902/903), vMotion, lập chỉ mục file (ElasticSearch), Defragment.

### 3. Giám sát Hiệu suất và Công cụ
* **Thành phần Disk:** Theo dõi **Disk lazy, Thin disk** (khai khống).
* **KPI Lưu trữ:** Giám sát **IOPS, Capacity, Latency, Throughput, Read/Write**.
* **Công cụ:**
    * **RvTools:** Xuất dữ liệu sang Excel/Power BI.
    * **VeeamONE:** Yêu cầu Windows Core 2019 DC (4 core/1000 host) - Quản lý qua Windows Admin Center/Powershell.
    * **Công cụ dòng lệnh:** `esxtop`, `vimtop`.

### 4. Công nghệ Mới
* **AI/LLM:** Khái niệm **Long Context** (32K ~ 1M token), **RAG** (Retrieval-Augmented Generation).
* **Bảo mật:** Yêu cầu về ngôn ngữ khoa học/chính xác trong bảo mật: **SSO/iAM/MFA, ADFS 2019 DC**.

***

## III. Phân tích Kịch bản Bảo mật vSphere (Ransomware)

Đây là phần bài tập chuyên sâu về bảo mật và kiến trúc hệ thống, tập trung vào **vSphere Security**.

### Bài tập: Phân tích và Phòng chống Ransomware trong Hạ tầng VMware

#### Kịch bản 1: Đánh giá Phương án Tắt vCenter
| | Phương án: Tắt vCenter khi không cần | Khuyến nghị (Best Practice) |
| :--- | :--- | :--- |
| **Bảo mật** | **Ưu điểm:** Giảm bề mặt tấn công của vCenter. | **Nhược điểm:** Mất toàn bộ khả năng Giám sát, Ghi Log và Cảnh báo. |
| **Vận hành** | **Nhược điểm:** Vô hiệu hóa **vMotion** và **DRS** (cân bằng tải tự động). Vô hiệu hóa quản lý tập trung (Host Profiles, Patching). | **Khuyến nghị:** **KHÔNG NÊN** tắt vCenter. Thay vào đó, tập trung vào: **Tách biệt Mạng Quản lý (VLAN riêng), vCenter HA (vCHA), Sao lưu vCenter định kỳ, và áp dụng MFA/SSO cho truy cập.** |

#### Kịch bản 2: Thiết kế Hạ tầng Bảo mật Cao
Kịch bản này mô tả một hạ tầng đã được cấu hình bảo mật rất tốt:

* **Phân tách Mạng:** **vCenter và ESXi** kết nối qua **MNGT LAN** (VLAN ID riêng) – *Tuân thủ Best Practice*.
* **Quản lý Truy cập Đặc quyền (PAM):** Sử dụng **CyberArk/SecurID (MFA)** để quản lý truy cập vCenter – *Kiểm soát truy cập nghiêm ngặt*.
* **Lockdown Mode:** Đã cấu hình trên ESXi Host.

##### Khái niệm: Lockdown Mode trong VMware ESXi
**Lockdown Mode** buộc tất cả các thao tác quản lý phải đi qua **vCenter Server**. Nó vô hiệu hóa việc đăng nhập trực tiếp (Client, SSH, Shell) vào ESXi host, trừ các tài khoản ngoại lệ được chỉ định. Đây là biện pháp bảo mật quan trọng để đảm bảo **vCenter** là điểm kiểm soát duy nhất, nơi các chính sách bảo mật (RBAC) và kiểm toán (Auditing) được áp dụng.

* **Storage Security:** Sử dụng **FC Zoning** đảm bảo chỉ các ESXi Host được phép mới có thể kết nối đến SAN.
* **Yêu cầu Tải Lớn:** Việc sử dụng **vMotion tự động** yêu cầu **DRS** hoạt động, điều này không mâu thuẫn với các biện pháp bảo mật trên.