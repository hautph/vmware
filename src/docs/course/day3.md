---
title: vSphere Cluster Operations & Security Management
day: 3
---

# Day 3: vSphere Cluster Operations

## Overview
Today's session focuses on advanced vSphere cluster management techniques, including resource pool management, scalable shares, and understanding the vSphere Cluster Services (vCLS) infrastructure. These concepts are essential for maintaining optimal performance and availability in vSphere environments.

## Learning Objectives
By the end of this session, you will be able to:
- Create and manage resource pools within vSphere clusters
- Understand and implement scalable shares for resource allocation
- Explain the function and importance of vSphere Cluster Services (vCLS)
- Identify operations that may impact vCLS VM health and cluster stability

## Topics Covered

### 1. Resource Pool Management

#### Creating Resource Pools
Resource pools allow you to partition and allocate CPU and memory resources within a cluster or host. They provide a flexible way to organize and prioritize workloads.

**Key Concepts:**
- Resource pools create a hierarchy for resource allocation
- Each resource pool can have CPU and memory reservations, limits, and shares
- Resource pools can contain virtual machines or other resource pools

**Creating a Resource Pool:**
1. Navigate to the cluster or host in the vSphere Client
2. Right-click and select **New Resource Pool**
3. Specify the pool name and resource settings:
   - CPU Reservation and Limit
   - Memory Reservation and Limit
   - Shares (Low, Normal, High, or Custom)

#### Managing Resource Pools
Effective resource pool management involves:
- Regularly reviewing resource allocation
- Adjusting reservations and limits based on workload requirements
- Monitoring resource usage to prevent contention
- Using resource pools to isolate workloads

**Best Practices:**
- Create resource pools that reflect your organizational structure
- Set appropriate reservations for critical workloads
- Use limits to prevent resource starvation of other workloads
- Regularly monitor and adjust resource allocations

### 2. Scalable Shares

#### Understanding Scalable Shares
Scalable shares provide a more dynamic approach to resource allocation by automatically adjusting the relative priority of resource pools based on their demand.

**How Scalable Shares Work:**
- When enabled, shares are automatically adjusted based on resource consumption
- Resource pools with higher demand receive proportionally more resources
- This helps optimize resource utilization across the cluster

#### Configuring Scalable Shares
To enable scalable shares:
1. Navigate to the cluster settings
2. Go to **Configure** > **Settings** > **General**
3. Enable **Scalable Shares**
4. Apply the configuration to existing resource pools

**Benefits:**
- Improved resource utilization
- Automatic adjustment to workload demands
- Reduced need for manual resource pool management
- Better performance for dynamic workloads

### 3. vSphere Cluster Services (vCLS)

#### What is vCLS?
vSphere Cluster Services (vCLS) is the infrastructure that enables and supports cluster services in vSphere 7.0 and later. It replaces the traditional vCenter Server agents that previously ran directly on ESXi hosts.

**Key Functions:**
- Hosts cluster services such as vSphere HA, DRS, and vSAN
- Provides a more resilient and scalable architecture
- Runs as virtual machines within the cluster

#### vCLS VM Characteristics
- Automatically deployed and managed by vCenter Server
- Runs on cluster hosts with minimal resource overhead
- Provides high availability for cluster services
- Isolated from user workloads

#### Managing vCLS
**Monitoring vCLS:**
- vCLS VMs are visible in the vSphere Client
- Monitor their resource usage and health status
- Check for any alerts or warnings related to vCLS

**Best Practices:**
- Ensure adequate cluster resources for vCLS VMs
- Avoid manually powering off or modifying vCLS VMs
- Maintain proper licensing for cluster services
- Regularly update vCenter Server and ESXi hosts

### 4. Operations That May Disrupt vCLS

#### Common Disruptive Operations
Certain operations can impact the health and functionality of vCLS VMs:

**Resource Constraints:**
- Insufficient CPU or memory resources in the cluster
- Storage congestion affecting vCLS VM operations
- Network issues preventing vCLS communication

**Configuration Changes:**
- Removing hosts from the cluster without proper evacuation
- Changing cluster settings that affect vCLS placement
- Modifying advanced settings related to cluster services

**Maintenance Activities:**
- Upgrading vCenter Server or ESXi hosts
- Performing storage maintenance that affects vCLS datastores
- Network maintenance that impacts vCLS communication

#### Preventive Measures
To maintain vCLS health:
- Ensure adequate cluster resources before maintenance
- Follow proper procedures for host removal and addition
- Schedule maintenance during low-impact periods
- Monitor cluster health during and after operations

## Hands-On Exercises

### Exercise 1: Creating and Configuring Resource Pools
1. Create a new resource pool named "Production" with:
   - CPU reservation: 2 GHz
   - Memory reservation: 4 GB
   - Shares: High
2. Create a child resource pool named "Development" under Production with:
   - CPU limit: 1 GHz
   - Memory limit: 2 GB
   - Shares: Normal
3. Assign virtual machines to appropriate resource pools

### Exercise 2: Enabling Scalable Shares
1. Enable scalable shares on your test cluster
2. Observe the behavior of resource pools under different load conditions
3. Compare resource allocation with and without scalable shares

### Exercise 3: Monitoring vCLS Health
1. Identify vCLS VMs in your cluster
2. Check their resource usage and health status
3. Review any alerts or warnings related to cluster services

## Key Takeaways
- Resource pools provide flexible resource allocation within clusters
- Scalable shares automatically adjust resource priorities based on demand
- vCLS is critical infrastructure for cluster services in vSphere 7.0+
- Proper planning and monitoring are essential to maintain cluster health

## Further Reading
- VMware vSphere Resource Management Documentation
- vSphere Cluster Services Best Practices Guide
- Scalable Shares Technical Deep Dive

-----

## I. Tổng hợp Kiến thức VMWare 8 - Ngày 3: Bảo mật và Quản trị

### 1. Bảo mật SSH Nâng cao (Zero Trust)

  * **Xu hướng Chuyển đổi:** Chuyển từ các giao thức kém an toàn (VNC, Telnet, FTP) sang **SSH/SSHD** (Secure Shell Daemon) là bắt buộc, đặc biệt trong lĩnh vực tài chính, ngân hàng.
  * **Vô hiệu hóa phương thức cũ:** Việc chặn dải IP không còn hiệu quả. **Không dùng chung tài khoản `root`** để tránh bị brute-force và block hệ thống.
  * **Zero Trust (Phương thức An toàn cao hơn):**
      * Yêu cầu **Key Import SSH** (Public Key Authentication) trước khi client được kết nối. Client phải có **key files** (ví dụ: PPK cho PuTTY) mới được chấp nhận.
      * **Secure SSH Host Server:** Sử dụng chữ ký số mạnh như **RSA 4096 byte**.
      * **SSH Client:** Hỗ trợ các thuật toán mã hóa mạnh (ví dụ: SHA1, AES256, MDH5, chunk size 4k).
      * **passphrase:** Sử dụng **mật khẩu muối (password salt)** để bảo vệ khóa cá nhân.
  * **Hardening (Tăng cường bảo mật Linux/ESXi):** Auto patching, hardening (tắt password/root login, dùng SSH key-based), **fail2ban** (cho Linux) và **auditd logging**.
  * **Các loại khóa SSH:** RSA, DSA, ECDSA, EdDSA (SSH-1 [RSA] là loại cũ).

### 2. Quản lý Người dùng và Bảo mật Tuân thủ

  * **Tuân thủ (Compliance):** Đảm bảo tiêu chuẩn **ISO 27002**. Mỗi người có tài khoản riêng, theo dõi log từng người, không dùng chung mật khẩu.
  * **Quản lý Tài khoản ESXi:**
      * **FIFO (First In First Out):** Dùng tài khoản người dùng thường để thêm Host vào vCenter.
      * **System Account Services:** Tài khoản dịch vụ nằm ở AD hoặc Local.
      * **Policy:** Thay đổi password định kỳ, không dùng `root` trong kết nối dịch vụ.
      * **Lockdown Mode:** Khi kích hoạt, tài khoản `root` mặc định trở thành **Read-Only**.
      * **Cách 2:** Dùng tài khoản **AD Group** (ví dụ: `ESXi Admin`) để cấp quyền admin cho ESXi.

### 3. Công nghệ và Công cụ Khác

  * **KMS (Key Management System):** Hệ thống quản lý khóa mã hóa.
  * **SSL/TLS:** Các giao thức bảo mật dùng để mã hóa truyền thông.
  * **vSphere Trust Authority (VTA):** Tính năng bảo mật cấp cao của vSphere, đảm bảo tính toàn vẹn (integrity) của ESXi Host và môi trường.
  * **ESXi 8.x Nâng cao:** Hỗ trợ **DPU** (Data Processing Unit) và yêu cầu **TPM 2.0** cùng **Secure Boot**.
  * **Patch/Update:** Tham khảo **esxi-patches.v-front.de** để theo dõi và quản lý các bản vá ESXi.

-----

## II. Phân tích Bài tập Thực hành

### Bài tập 1: Cấu hình SSH Key-based Authentication trên ESXi

Bài tập này yêu cầu chi tiết hóa quy trình sử dụng **chữ ký số/Key Import** (Public Key Authentication) để bảo mật SSH Port 22 trên ESXi, áp dụng cho các công cụ Client như **PuTTY, WinSCP, SFTP**.

#### Các bước cấu hình cốt lõi (Yêu cầu ảnh minh họa)

1.  **Tạo cặp Khóa (Key Pair) trên Client:**

      * Sử dụng công cụ như **PuTTYgen** để tạo một cặp khóa SSH (RSA 4096 bit hoặc Ed25519) .
      * Lưu **Khóa Cá nhân (Private Key)** dưới định dạng PPK (cho PuTTY) và bảo vệ bằng **Passphrase** (mật khẩu muối).
      * Sao chép **Khóa Công khai (Public Key)**.

2.  **Cài đặt Khóa Công khai trên ESXi Host:**

      * Đăng nhập vào ESXi Host (qua SSH hoặc Shell) và kích hoạt dịch vụ SSH.
      * Sử dụng lệnh để thêm Khóa Công khai vào file `authorized_keys` của tài khoản người dùng ESXi (ví dụ: tài khoản `root` hoặc tài khoản thường được ủy quyền):
        ```bash
        echo "ssh-rsa AAAA..." >> /etc/ssh/keys/$(whoami)/authorized_keys
        ```
      * Kiểm tra quyền truy cập của file `authorized_keys` .

3.  **Cấu hình SSH Daemon (SSHD) trên ESXi:**

      * Chỉnh sửa file cấu hình SSH (thường là `/etc/ssh/sshd_config`).
      * **Bắt buộc sử dụng Key:** Đặt `PasswordAuthentication no` và `PermitRootLogin prohibit-password` (hoặc `no` nếu dùng tài khoản thường) để vô hiệu hóa đăng nhập bằng mật khẩu.
      * Khởi động lại dịch vụ SSHD: `service sshd restart`.

4.  **Kết nối từ Client:**

      * **PuTTY:** Trong cấu hình Session, đi tới **Connection -\> SSH -\> Auth** và chỉ định đường dẫn đến **Khóa Cá nhân (PPK file)** đã tạo .
      * **WinSCP/SFTP:** Tương tự, cấu hình session và chỉ định file Khóa Cá nhân (PPK/Private Key).
      * Khi kết nối, Client sẽ chỉ yêu cầu **Passphrase** của Khóa Cá nhân (nếu có), không yêu cầu mật khẩu của tài khoản ESXi.

### Bài tập 2: Slide Nâng cấp ESXi (Lifecycle Manager)

Bài tập này là một yêu cầu về định dạng tài liệu, đòi hỏi kiến thức về **Life Cycle Manager (LCM)** trong vCenter.

  * **Nội dung Slide:** Quy trình nâng cấp ESXi 7.x lên 8.x bằng LCM.
  * **Định dạng:** Full screen HTML5, menu/sub-menu cố định (Header/Footer), nội dung tối ưu cho khổ giấy A4 xoay ngang (khi in PDF/PPTx).
  * **Các bước Cốt lõi (Mỗi bước 1 Slide):**
    1.  **Tổng quan về LCM:** Giới thiệu LCM và khái niệm **Baseline** hoặc **Image**.
    2.  **Import ISO:** Import file ISO của ESXi 8.x vào vCenter/LCM.
    3.  **Tạo Baseline/Image:** Tạo **Remediation Baseline** (cho chế độ Baseline) hoặc thiết lập **Cluster Image** (cho chế độ Image) nhắm tới ESXi 8.x.
    4.  **Kiểm tra Tuân thủ (Check Compliance):** Quét các Host/Cluster để xác định Host nào không tuân thủ Baseline/Image.
    5.  **Remediate (Sửa chữa):** Thực hiện quá trình nâng cấp (Remediation). LCM sẽ tự động:
          * Di chuyển VM bằng vMotion.
          * Chuyển Host sang **Maintenance Mode**.
          * Cài đặt/Nâng cấp ESXi.
          * Khởi động lại Host.
          * Đưa Host ra khỏi Maintenance Mode.
    6.  **Kiểm tra Sau Nâng cấp:** Xác minh Host đã nâng cấp thành công lên ESXi 8.x và tuân thủ.

### Bài tập 3 & 4: Thêm ESXi vào vCenter mà không dùng tài khoản root

Bài tập này áp dụng Best Practice bảo mật: **Sử dụng tài khoản có đặc quyền tối thiểu (Least Privilege)** để kết nối các dịch vụ.

#### Các bước cấu hình cốt lõi (Yêu cầu ảnh minh họa)

1.  **Tạo Người dùng Thường trên ESXi:**

      * Sử dụng vSphere Client (hoặc SSH) để tạo tài khoản thường trên ESXi Host (ví dụ: `thang`).
      * **Quan trọng:** Cần thêm người dùng này vào nhóm **`Administrators`** (hoặc tạo một vai trò tương đương) trên ESXi để có đủ quyền thêm Host vào vCenter.
      * *(Tham khảo: Để tránh dùng `root`, một user thường phải có quyền tương đương trên ESXi.)* .

2.  **Ủy quyền Truy xuất Khóa (Bài 4 nâng cao):**

      * Nếu bạn muốn user `thang` truy cập vào **chữ ký số/thư mục `/root`** (rất không nên làm), bạn phải thay đổi quyền truy cập (permissions) của các thư mục/file đó bằng lệnh `chmod`/`chown` trên ESXi Shell.
      * **Lưu ý Bảo mật:** Việc cấp quyền truy cập vào `/root` cho tài khoản thường **vi phạm nguyên tắc bảo mật cơ bản**. Nên tạo thư mục riêng cho user `thang` thay vì sử dụng `/root`.
      * *Trong kịch bản thực tế, user `thang` chỉ cần quyền quản trị trên ESXi để kết nối với vCenter.*
      * **Giải pháp tốt hơn:** User `thang` sử dụng SSH Key-based Authentication, và file `authorized_keys` của user `thang` được đặt trong thư mục Home của user đó (ví dụ: `/etc/ssh/keys/thang/authorized_keys`).

3.  **Thêm Host vào vCenter:**

      * Trong vCenter (vSphere Client), khi thực hiện tác vụ **Add Host**.
      * Nhập IP hoặc FQDN của ESXi Host.
      * Ở bước nhập thông tin đăng nhập, sử dụng **Username là `thang`** và mật khẩu tương ứng, **KHÔNG dùng `root`**. .

4.  **Xác minh Host đã thêm:**

      * Kiểm tra Host đã xuất hiện trong Inventory của vCenter.
      * Kiểm tra Log để đảm bảo vCenter đã sử dụng tài khoản `thang` để hoàn thành quá trình thêm Host.